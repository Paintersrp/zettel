package hypermedia

import (
	"net/http"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/components/auth"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cfg *config.Config) {
	api := e.Group(cfg.HypermediaApiPrefix)
	api.Use(middleware.Logger())

	api.GET("", func(c echo.Context) error {
		return c.JSON(
			http.StatusOK,
			map[string]string{"status": "OK"},
		)
	})

	api.GET("/register-form", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, auth.RegisterForm())
	})

	api.GET("/login-form", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, auth.LoginForm())
	})
}
