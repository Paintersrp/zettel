package api

import (
	"github.com/Paintersrp/zettel/internal/api/notes"
	"github.com/Paintersrp/zettel/internal/api/notes/remote"
	"github.com/Paintersrp/zettel/internal/api/tags"
	"github.com/Paintersrp/zettel/internal/api/vaults"
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func RegisterRoutes(
	e *echo.Echo,
	q *db.Queries,
	cache *cache.Cache,
	cfg *config.Config,
	l *zap.Logger,
) {
	api := e.Group(cfg.DataApiPrefix)
	api.Use(middleware.Logger(l))

	validator := validate.New()

	vs := vaults.NewVaultService(q)
	vh := vaults.NewVaultHandler(cfg, cache, validator, vs)
	vaults.RegisterRoutes(vh, api)

	ns := notes.NewNoteService(q)
	nh := notes.NewNoteHandler(cfg, cache, validator, ns)
	notes.RegisterRoutes(nh, api)

	rs := remote.NewRemoteService(q)
	rh := remote.NewRemoteHandler(cfg, cache, validator, rs, ns)
	remote.RegisterRoutes(rh, api)

	ts := tags.NewTagService(q)
	th := tags.NewTagHandler(cfg, cache, validator, ts)
	tags.RegisterRoutes(th, api)
}
