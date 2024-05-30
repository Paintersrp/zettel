package oauth

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/auth/user"
	"github.com/Paintersrp/zettel/pkg/auth/utils"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

var (
	googleUserInfoURL = "https://www.googleapis.com/oauth2/v3/userinfo"
)

type OAuthHandler struct {
	google       *oauth2.Config
	github       *oauth2.Config
	db           *db.Queries
	userService  *user.UserService
	oauthService *OAuthService
	validator    *validate.Validator
	config       *config.Config
}

func NewOAuthHandler(
	queries *db.Queries,
	cfg *config.Config,
	userService *user.UserService,
	oauthService *OAuthService,
	validator *validate.Validator,
) *OAuthHandler {
	googleConfig := &oauth2.Config{
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	githubConfig := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URL"),
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}

	return &OAuthHandler{
		google:       googleConfig,
		github:       githubConfig,
		db:           queries,
		userService:  userService,
		oauthService: oauthService,
		validator:    validator,
		config:       cfg,
	}
}

func (h *OAuthHandler) GoogleLogin(c echo.Context) error {
	url := h.google.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *OAuthHandler) GoogleCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Missing code query parameter"},
		)
	}

	token, err := h.google.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	client := h.google.Client(context.Background(), token)
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

	// TODO: Move Generators to Service?
	// TODO: Infact, move a lot of this OAuth Logic out of the Handler
	user, userErr = h.oauthService.GetUserByEmail(c.Request().Context(), userInfo.Email)
	if userErr != nil {
		autoUsername := utils.GenerateUsername(userInfo.Email)
		autoPassword := utils.GeneratePassword()
		user, userErr = h.userService.Register(
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

	loginToken, err := utils.GenerateJWT(user, h.config.JwtSecret, 24*60)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(utils.GenerateCookie(loginToken))

	//return c.JSON(http.StatusOK, map[string]string{"token": loginToken})
	return c.HTML(http.StatusOK, `
        <html>
            <body>
                <script>
                    // Send the JWT token back to the frontend
                    window.opener.postMessage({ token: '`+loginToken+`' }, window.origin);
                    window.opener.postMessage({ success: true, token: '`+loginToken+`' }, 'http://localhost:6474');
                    window.close();
                </script>
            </body>
        </html>
    `)
}

func (h *OAuthHandler) GitHubLogin(c echo.Context) error {
	url := h.github.AuthCodeURL("state", oauth2.AccessTypeOnline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *OAuthHandler) GitHubCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Missing code query parameter"},
		)
	}

	token, err := h.github.Exchange(context.Background(), code)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	client := h.github.Client(context.Background(), token)
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

	user, userErr = h.oauthService.GetUserByEmail(c.Request().Context(), userInfo.Email)
	if userErr != nil {
		autoUsername := utils.GenerateUsername(userInfo.Email)
		autoPassword := utils.GeneratePassword()
		user, userErr = h.userService.Register(
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

	loginToken, err := utils.GenerateJWT(user, h.config.JwtSecret, 24*60)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(utils.GenerateCookie(loginToken))
	return c.HTML(http.StatusOK, `
        <html>
            <body>
                <script>
                    // Send the JWT token back to the frontend
                    window.opener.postMessage({ token: '`+loginToken+`' }, window.origin);
                    window.opener.postMessage({ success: true, token: '`+loginToken+`' }, 'http://localhost:6474');
                    window.close();
                </script>
            </body>
        </html>
    `)
}
