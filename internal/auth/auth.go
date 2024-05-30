package auth

import (
	"github.com/Paintersrp/zettel/internal/auth/oauth"
	"github.com/Paintersrp/zettel/internal/auth/ssh"
	"github.com/Paintersrp/zettel/internal/auth/user"
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

func RegisterAuthRoutes(
	e *echo.Echo,
	q *db.Queries,
	cache *cache.Cache,
	cfg *config.Config,
	l *zap.Logger,
) {
	validator := validate.New()

	api := e.Group(cfg.AuthApiPrefix)
	api.Use(middleware.Logger(l))

	us := user.NewUserService(q)
	uh := user.NewUserHandler(cfg, validator, us)
	user.RegisterRoutes(uh, api, cfg)

	os := oauth.NewOAuthService(q, us)
	oh := oauth.NewOAuthHandler(cfg, validator, os, us)
	oauth.RegisterRoutes(oh, api)

	ss := ssh.NewSSHService(q)
	sh := ssh.NewSSHHandler(cfg, validator, ss)
	ssh.RegisterRoutes(sh, api)
}
