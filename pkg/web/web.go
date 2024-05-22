package web

import (
	"net/http"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/pages"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cfg *config.Config) {
	web := e.Group("")
	web.Use(middleware.Authentication(cfg.JwtSecret))
	e.Static("/public", "public")

	web.GET("test", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Hello("Titfucker"))
	})

	web.GET("", func(c echo.Context) error {
		user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
		if ok {
			return utils.Render(c, http.StatusOK, pages.Home(user))
		} else {
			return utils.Render(c, http.StatusOK, pages.Home(user))
		}
	})

	web.GET("login", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Login())
	})

	web.GET("register", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Register())
	})
}
