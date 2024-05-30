package api

import (
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/api/notes"
	"github.com/Paintersrp/zettel/pkg/api/notes/remote"
	"github.com/Paintersrp/zettel/pkg/api/tags"
	"github.com/Paintersrp/zettel/pkg/api/vaults"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RegisterRoutes(e *echo.Echo, q *db.Queries, cache *cache.Cache, cfg *config.Config) {
	api := e.Group(cfg.DataApiPrefix)
	api.Use(middleware.Logger())

	validator := validate.New()

	vh := vaults.NewVaultHandler(cfg, q, cache)
	vaults.RegisterRoutes(vh, api)

	ns := notes.NewNoteService(q, validator)
	nh := notes.NewNoteHandler(cfg, q, cache, ns)
	notes.RegisterRoutes(nh, api)

	rs := remote.NewRemoteService(q, validator)
	rh := remote.NewRemoteHandler(cfg, q, cache, rs, ns)
	remote.RegisterRoutes(rh, api)

	th := tags.NewTagHandler(cfg, q, cache)
	tags.RegisterRoutes(th, api)

}
