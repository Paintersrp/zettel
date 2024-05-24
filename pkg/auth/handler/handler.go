package handler

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/auth/jwt"
	"github.com/Paintersrp/zettel/pkg/auth/service"
	"github.com/Paintersrp/zettel/pkg/auth/utils"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"golang.org/x/crypto/ssh"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

var googleUserInfoURL = "https://www.googleapis.com/oauth2/v3/userinfo"

type RegisterInput struct {
	Username  string `json:"username"   validate:"required,min=3,max=255"`
	Email     string `json:"email"      validate:"required,email"`
	Password  string `json:"password"   validate:"required,min=8"`
	PublicKey string `json:"public_key"`
}

type SSHInput struct {
	Name      string `json:"name"`
	PublicKey string `json:"public_key"`
}

type LoginInput struct {
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type ResetPasswordInput struct {
	Email       string `json:"email"        validate:"required,email"`
	NewPassword string `json:"new_password" validate:"required,min=8"`
}

type Handler struct {
	googleClient *oauth2.Config
	githubClient *oauth2.Config
	service      *service.AuthService
	validator    *validate.Validator
	config       *config.Config
}

func NewHandler(queries *db.Queries, cfg *config.Config) *Handler {
	authService := service.NewAuthService(queries)
	validator := validate.New()
	googleOAuthConfig := &oauth2.Config{
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}

	githubOAuthConfig := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URL"),
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}

	return &Handler{
		googleClient: googleOAuthConfig,
		githubClient: githubOAuthConfig,
		service:      authService,
		validator:    validator,
		config:       cfg,
	}
}

func RegisterRoutes(e *echo.Echo, queries *db.Queries, cfg *config.Config) {
	handler := NewHandler(queries, cfg)

	api := e.Group(cfg.AuthApiPrefix)
	api.Use(middleware.Logger())

	fmt.Println("here")
	api.POST("/register", handler.Register)
	api.POST("/login", handler.Login)
	api.POST("/reset-password", handler.ResetPassword)
	api.POST("/logout", handler.Logout)

	api.POST("/keys", handler.SaveSSHKey)
	api.GET("/keys", handler.GetSSHKeys)
	api.GET("/keys/:id", handler.GetSSHKey)
	api.PATCH("/keys/:id", handler.UpdateSSHKey)
	api.DELETE("/keys/:id", handler.DeleteSSHKey)

	api.GET("/google/login", handler.GoogleLogin)
	api.GET("/google/callback", handler.GoogleCallback)
	api.GET("/github/login", handler.GitHubLogin)
	api.GET("/github/callback", handler.GitHubCallback)
}

// TODO: SSH Handler / Service
func (h *Handler) SaveSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	// userID := pgtype.Int4{Int32: int32(user.ID), Valid: true}

	var input SSHInput
	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}
	publicKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(input.PublicKey))
	if err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid SSH public key"},
		)
	}

	fingerprint := ssh.FingerprintSHA256(publicKey)
	sshKey := &service.SSHKey{
		UserID:      user.ID,
		PublicKey:   input.PublicKey,
		Name:        input.Name,
		Fingerprint: fingerprint,
	}

	if err := h.service.SaveSSHKey(c.Request().Context(), sshKey); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusOK, map[string]string{"status": "OK"})
}

func (h *Handler) GetSSHKeys(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	keys, err := h.service.GetSSHKeys(c.Request().Context(), user.ID)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusOK, keys)
}

func (h *Handler) GetSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to view this ssh key."},
		)
	}

	return c.JSON(http.StatusOK, key)
}

func (h *Handler) UpdateSSHKey(c echo.Context) error {
	fmt.Println("here")
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	var input struct {
		PublicKey string `json:"public_key" validate:"required"`
		Name      string `json:"name" validate:"required"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to view this ssh key."},
		)
	}

	publicKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(input.PublicKey))
	if err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid SSH public key"},
		)
	}

	fingerprint := ssh.FingerprintSHA256(publicKey)
	key, updateErr := h.service.UpdateSSHKey(
		c.Request().Context(),
		int32(id),
		input.PublicKey,
		input.Name,
		fingerprint,
	)
	if updateErr != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": updateErr.Error()},
		)
	}

	return c.JSON(http.StatusOK, key)
}

func (h *Handler) DeleteSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to view this ssh key."},
		)
	}

	if err := h.service.DeleteSSHKey(c.Request().Context(), int32(id)); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusNoContent, nil)
}

func (h *Handler) Register(c echo.Context) error {
	var input RegisterInput
	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}

	if err := h.validator.Validate(input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	user, err := h.service.Register(
		c.Request().Context(),
		input.Username,
		input.Email,
		input.Password,
	)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	token, err := jwt.GenerateJWT(user, h.config.JwtSecret, 24)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(jwt.GenerateCookie(token))
	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

func (h *Handler) Login(c echo.Context) error {
	var input LoginInput
	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}

	if err := h.validator.Validate(input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	user, err := h.service.Login(c.Request().Context(), input.Email, input.Password)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}

	token, err := jwt.GenerateJWT(user, h.config.JwtSecret, 24)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(jwt.GenerateCookie(token))

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

// TODO: Verify token
func (h *Handler) ResetPassword(c echo.Context) error {
	var input ResetPasswordInput
	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}

	if err := h.validator.Validate(input); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	_, err := h.service.ResetPassword(
		c.Request().Context(),
		input.Email,
		input.NewPassword,
	)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(
		http.StatusOK,
		map[string]string{"message": "Password reset successful"},
	)
}

func (h *Handler) Logout(c echo.Context) error {
	jwt.RemoveCookie(c.Response().Writer)
	return c.Redirect(http.StatusTemporaryRedirect, "/")
}

func (h *Handler) GoogleLogin(c echo.Context) error {
	url := h.googleClient.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *Handler) GoogleCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Missing code query parameter"},
		)
	}

	token, err := h.googleClient.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	client := h.googleClient.Client(context.Background(), token)
	resp, err := client.Get(googleUserInfoURL)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	var userInfo struct {
		Email string `json:"email"`
	}

	if err := json.Unmarshal(data, &userInfo); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	var (
		user    *db.User
		userErr error
	)

	user, userErr = h.service.GetUserByEmail(c.Request().Context(), userInfo.Email)
	if userErr != nil {
		autoUsername := utils.GenerateUsername(userInfo.Email)
		autoPassword := utils.GeneratePassword()
		user, userErr = h.service.Register(
			c.Request().Context(),
			autoUsername,
			userInfo.Email,
			autoPassword,
		)
		if userErr != nil {
			return c.JSON(
				http.StatusInternalServerError,
				map[string]string{"error": userErr.Error()},
			)
		}
	}

	loginToken, err := jwt.GenerateJWT(user, h.config.JwtSecret, 24)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(jwt.GenerateCookie(loginToken))
	return c.Redirect(http.StatusTemporaryRedirect, "/")
}

func (h *Handler) GitHubLogin(c echo.Context) error {
	url := h.githubClient.AuthCodeURL("state", oauth2.AccessTypeOnline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *Handler) GitHubCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Missing code query parameter"},
		)
	}

	token, err := h.githubClient.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	client := h.githubClient.Client(context.Background(), token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}
	defer resp.Body.Close()

	var userInfo struct {
		Email string `json:"email"`
		Login string `json:"login"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if userInfo.Email == "" {
		userInfo.Email = utils.GenerateGithubEmail(userInfo.Login)
	}

	var (
		user    *db.User
		userErr error
	)

	user, userErr = h.service.GetUserByEmail(c.Request().Context(), userInfo.Email)
	if userErr != nil {
		autoUsername := utils.GenerateUsername(userInfo.Email)
		autoPassword := utils.GeneratePassword()
		user, userErr = h.service.Register(
			c.Request().Context(),
			autoUsername,
			userInfo.Email,
			autoPassword,
		)
		if userErr != nil {
			return c.JSON(
				http.StatusInternalServerError,
				map[string]string{"error": userErr.Error()},
			)
		}
	}

	loginToken, err := jwt.GenerateJWT(user, h.config.JwtSecret, 24)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(jwt.GenerateCookie(loginToken))
	return c.Redirect(http.StatusTemporaryRedirect, "/")
}
