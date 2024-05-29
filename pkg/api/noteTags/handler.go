package noteTags

import (
	"context"
	"net/http"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type NoteTagHandler struct {
	validator *validate.Validator
	config    *config.Config
	db        *db.Queries
	cache     *cache.Cache
	isDev     bool
}

func NewNoteTagHandler(
	cfg *config.Config,
	db *db.Queries,
	cache *cache.Cache,
) *NoteTagHandler {
	validator := validate.New()

	return &NoteTagHandler{
		validator: validator,
		config:    cfg,
		db:        db,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *NoteTagHandler) All(c echo.Context) error {
	vaults, err := h.db.GetNoteTags(context.Background())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vaults)
}
