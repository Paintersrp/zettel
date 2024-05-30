package tags

import (
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type TagHandler struct {
	config    *config.Config
	cache     *cache.Cache
	validator *validate.Validator
	service   *TagService
	isDev     bool
}

func NewTagHandler(
	cfg *config.Config,
	cache *cache.Cache,
	validator *validate.Validator,
	service *TagService,
) *TagHandler {

	return &TagHandler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *TagHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *TagHandler) All(c echo.Context) error {
	tags, err := h.service.All(c.Request().Context())
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, tags)
}

func (h *TagHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[TagPayload](c, h)
	if err != nil {
		return err
	}

	tag, err := h.service.Create(c.Request().Context(), payload.Name)
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

	tag, err := h.service.Update(
		c.Request().Context(),
		int32(id),
		payload.Name,
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

	vault, err := h.service.Read(c.Request().Context(), int32(id))
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

	err = h.service.Delete(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
