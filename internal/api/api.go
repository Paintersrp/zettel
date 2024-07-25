package api

import (
	"github.com/Paintersrp/zettel/internal/api/hubs"
	"github.com/Paintersrp/zettel/internal/api/notes"
	"github.com/Paintersrp/zettel/internal/api/tags"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/pkg/cache"
	"github.com/Paintersrp/zettel/internal/pkg/middleware"
	"github.com/Paintersrp/zettel/internal/pkg/validate"
	"github.com/labstack/echo/v4"
	"github.com/rs/zerolog"
)

func RegisterRoutes(
	e *echo.Echo,
	q *db.Queries,
	cache *cache.Cache,
	cfg *config.Config,
	l zerolog.Logger,
) {
	api := e.Group(cfg.DataApiPrefix)
	api.Use(middleware.Logger(l))
	api.Use(middleware.Authentication(cfg.JwtSecret))

	validator := validate.New()

	// vs := vaults.NewVaultService(q)
	// vh := vaults.NewVaultHandler(cfg, cache, validator, vs, us)
	// vaults.RegisterRoutes(vh, api)

	hubService := hubs.NewHubService(q)
	hubHandler := hubs.NewHubHandler(cfg, cache, validator, hubService)
	hubs.RegisterRoutes(hubHandler, api)

	ns := notes.NewNoteService(q)
	nh := notes.NewNoteHandler(cfg, cache, validator, ns)
	notes.RegisterRoutes(nh, api)

	// rs := remote.NewRemoteService(q)
	// rh := remote.NewRemoteHandler(cfg, cache, validator, rs, ns)
	// remote.RegisterRoutes(rh, api)

	ts := tags.NewTagService(q)
	th := tags.NewTagHandler(cfg, cache, validator, ts)
	tags.RegisterRoutes(th, api)
}
