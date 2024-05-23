package handler

import (
	"net/http"
	"time"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/pages"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	validator *validate.Validator
	config    *config.Config
	cache     *cache.Cache
	isDev     bool
}

func NewHandler(cfg *config.Config, cache *cache.Cache) *Handler {
	validator := validate.New()

	return &Handler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *Handler) Login(c echo.Context) error {
	return utils.RenderWithCaching(
		c,
		http.StatusOK,
		pages.Login(),
		h.cache,
		utils.GetTTLByEnv(h.isDev, 1*time.Minute),
	)
}

func (h *Handler) Register(c echo.Context) error {
	return utils.RenderWithCaching(
		c,
		http.StatusOK,
		pages.Register(),
		h.cache,
		utils.GetTTLByEnv(h.isDev, 1*time.Minute),
	)
}

func (h *Handler) Home(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if ok {
		return utils.Render(c, http.StatusOK, pages.Home(user))
	} else {
		return utils.Render(c, http.StatusOK, pages.Home(user))
	}
}
