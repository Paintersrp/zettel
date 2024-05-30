package tags

import (
	"context"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type TagHandler struct {
	validator *validate.Validator
	config    *config.Config
	db        *db.Queries
	cache     *cache.Cache
	isDev     bool
}

func NewTagHandler(
	cfg *config.Config,
	db *db.Queries,
	cache *cache.Cache,
) *TagHandler {
	validator := validate.New()

	return &TagHandler{
		validator: validator,
		config:    cfg,
		db:        db,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *TagHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *TagHandler) All(c echo.Context) error {
	vaults, err := h.db.GetTags(context.Background())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vaults)
}

func (h *TagHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[TagPayload](c, h)
	if err != nil {
		return err
	}

	tag, err := h.db.CreateTag(c.Request().Context(), payload.Name)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, tag)
}

func (h *TagHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid tag ID")
	}

	payload, err := utils.BindAndValidatePayload[TagPayload](c, h)
	if err != nil {
		return err
	}

	tag, err := h.db.UpdateTag(
		c.Request().Context(),
		db.UpdateTagParams{ID: int32(id), Name: payload.Name},
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, tag)
}

func (h *TagHandler) Read(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	vault, err := h.db.GetTag(context.Background(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vault)
}

func (h *TagHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	err = h.db.DeleteTag(context.Background(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
