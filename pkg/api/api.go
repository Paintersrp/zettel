package api

import (
	"net/http"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cfg *config.Config) {
	api := e.Group(cfg.DataApiPrefix)
	api.Use(middleware.Logger())

	api.GET("", func(c echo.Context) error {
		return c.JSON(
			http.StatusOK,
			map[string]string{"status": "OK"},
		)
	})

	api.GET("/users/:id", func(c echo.Context) error {
		id := c.Param("id")
		name := getUser(id)
		return c.JSON(http.StatusOK, struct {
			ID   string
			Name string
		}{
			ID:   id,
			Name: name,
		})
	})
}

func getUser(id string) string {
	if id == "123" {
		return "otelecho tester"
	}
	return "unknown"
}
