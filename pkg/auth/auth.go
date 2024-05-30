package auth

import (
	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/auth/oauth"
	"github.com/Paintersrp/zettel/pkg/auth/ssh"
	"github.com/Paintersrp/zettel/pkg/auth/user"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func RegisterAuthRoutes(
	e *echo.Echo,
	q *db.Queries,
	cache *cache.Cache,
	cfg *config.Config,
) {
	validator := validate.New()

	api := e.Group(cfg.AuthApiPrefix)
	api.Use(middleware.Logger())

	us := user.NewUserService(q)
	uh := user.NewUserHandler(q, cfg, us, validator)
	user.RegisterRoutes(uh, api, cfg)

	os := oauth.NewOAuthService(q, us)
	oh := oauth.NewOAuthHandler(q, cfg, us, os, validator)
	oauth.RegisterRoutes(oh, api)

	ss := ssh.NewSSHService(q)
	sh := ssh.NewSSHHandler(q, cfg, ss, validator)
	ssh.RegisterRoutes(sh, api)
}
