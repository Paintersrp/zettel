package hypermedia

import (
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cache *cache.Cache, cfg *config.Config) {
	handler := newHandler(cfg, cache)
	api := e.Group(cfg.HypermediaApiPrefix)

	api.GET("/register-form", handler.RegisterForm)
	api.GET("/login-form", handler.LoginForm)

}
