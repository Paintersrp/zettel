package web

import (
	"net/http"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/pages"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cfg *config.Config) {
	web := e.Group("")
	e.Static("/public", "public")

	web.GET("test", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Hello("Titfucker"))
	})

	web.GET("", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Home())
	})

	web.GET("login", func(c echo.Context) error {
		return utils.Render(c, http.StatusOK, pages.Login())
	})
}
