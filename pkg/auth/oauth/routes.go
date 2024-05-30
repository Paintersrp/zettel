package oauth

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(handler *OAuthHandler, e *echo.Group) {
	e.GET("/google/login", handler.GoogleLogin)
	e.GET("/google/callback", handler.GoogleCallback)
	e.GET("/github/login", handler.GitHubLogin)
	e.GET("/github/callback", handler.GitHubCallback)
}
