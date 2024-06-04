package user

import (
	"fmt"
	"net/http"

	"github.com/Paintersrp/zettel/internal/auth/utils"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	ut "github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

// TODO: Refresh Token
// TODO: Blacklist Token

type UserHandler struct {
	config    *config.Config
	validator *validate.Validator
	service   *UserService
}

func NewUserHandler(
	cfg *config.Config,
	validator *validate.Validator,
	userService *UserService,
) *UserHandler {
	return &UserHandler{
		service:   userService,
		validator: validator,
		config:    cfg,
	}
}

func (h *UserHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *UserHandler) Register(c echo.Context) error {
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

	token, err := utils.GenerateJWT(user, h.config.JwtSecret, 24*60)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(utils.GenerateCookie(token))
	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

// TODO: Validate and Bind
func (h *UserHandler) Login(c echo.Context) error {
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

	user, err := h.service.Login(
		c.Request().Context(),
		input.Email,
		input.Password,
	)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, map[string]string{"error": err.Error()})
	}

	token, err := utils.GenerateJWT(user, h.config.JwtSecret, 24*60)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}

	c.SetCookie(utils.GenerateCookie(token))

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

func (h *UserHandler) Logout(c echo.Context) error {
	utils.RemoveCookie(c.Response().Writer)

	// TODO: Convert to status ok, redirect on frontend
	return c.Redirect(http.StatusTemporaryRedirect, "http://localhost:5173")
}

func (h *UserHandler) GetUser(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		// TODO:
		fmt.Println(ok, user)
	}

	data, err := h.service.GetUser(c.Request().Context(), user.ID)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, data)
}

func (h *UserHandler) UpdateProfile(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		fmt.Println(ok, user)
	}

	payload, err := ut.BindAndValidatePayload[UpdateProfileInput](c, h)
	if err != nil {
		return err
	}

	if payload.ID != user.ID {
		return c.NoContent(http.StatusUnauthorized)
	}

	var emailChanged bool
	if payload.Email != user.Email {
		emailChanged = true
	} else {
		emailChanged = false
	}

	updatedUser, err := h.service.UpdateProfile(
		c.Request().Context(),
		payload,
		emailChanged,
	)
	if err != nil {
		return err
	}

	u, err := h.service.GetUserByEmail(c.Request().Context(), updatedUser.Email)
	if err != nil {
		return err
	}

	token, err := utils.GenerateJWT(u, h.config.JwtSecret, 24*60)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": "Failed to generate token"},
		)
	}
	utils.RemoveCookie(c.Response().Writer)

	return c.JSON(
		http.StatusOK,
		map[string]interface{}{"token": token, "user": updatedUser},
	)
}

func (h *UserHandler) ResendVerificationEmail(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		// TODO:
		fmt.Println(ok, user)
	}

	payload, err := ut.BindAndValidatePayload[SendVerificationEmailInput](c, h)
	if err != nil {
		return err
	}

	fmt.Println(payload)

	err = h.service.ResendVerificationEmail(c.Request().Context(), payload)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "OK")
}

func (h *UserHandler) VerifyEmail(c echo.Context) error {
	payload, err := ut.BindAndValidatePayload[VerifyEmailInput](c, h)
	if err != nil {
		return err
	}

	err = h.service.VerifyEmail(c.Request().Context(), payload.Token)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, "OK")
}

// TODO: Verify token
func (h *UserHandler) ResetPassword(c echo.Context) error {
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
