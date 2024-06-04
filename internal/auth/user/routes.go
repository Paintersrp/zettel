package user

import (
	"github.com/Paintersrp/zettel/internal/config"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(handler *UserHandler, e *echo.Group, cfg *config.Config) {
	e.POST("/register", handler.Register)
	e.POST("/login", handler.Login)
	e.POST("/reset-password", handler.ResetPassword)
	e.GET("/logout", handler.Logout)
	e.GET("/user", handler.GetUser, mid.Authentication(cfg.JwtSecret))
	e.POST("/resend-verification", handler.ResendVerificationEmail)
	e.POST("/verify-email", handler.VerifyEmail)
	e.POST("/profile", handler.UpdateProfile)
}
