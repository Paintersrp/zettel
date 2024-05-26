package web

import (
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/pkg/web/handler"
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cache *cache.Cache, cfg *config.Config) {
	handler := handler.NewHandler(cfg, q, cache)

	e.Static("/public", "public")
	web := e.Group("")
	web.Use(middleware.VaultMiddleware(q))

	web.GET("", handler.Home)
	web.GET("login", handler.Login)
	web.GET("register", handler.Register)
	web.GET("vault", handler.Notes)
	web.GET("vault/:id", handler.Vault)
	web.GET("note/:id", handler.Note)
}
