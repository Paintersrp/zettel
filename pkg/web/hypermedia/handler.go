package hypermedia

import (
	"net/http"
	"time"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/components/auth"
	"github.com/labstack/echo/v4"
)

type handler struct {
	validator *validate.Validator
	config    *config.Config
	cache     *cache.Cache
	isDev     bool
}

func newHandler(cfg *config.Config, cache *cache.Cache) *handler {
	validator := validate.New()

	return &handler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *handler) LoginForm(c echo.Context) error {
	return utils.RenderWithCaching(
		c,
		http.StatusOK,
		auth.LoginForm(),
		h.cache,
		utils.GetTTLByEnv(h.isDev, 1*time.Minute),
	)
}

func (h *handler) RegisterForm(c echo.Context) error {
	return utils.RenderWithCaching(
		c,
		http.StatusOK,
		auth.RegisterForm(),
		h.cache,
		utils.GetTTLByEnv(h.isDev, 1*time.Minute),
	)
}
