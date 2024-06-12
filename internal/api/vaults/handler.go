package vaults

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

// TODO: Check if Vault.UserID === user.id
// if key.UserID != user.ID {
// 	return c.JSON(
// 		http.StatusBadRequest,
// 		map[string]string{"error": "Not authorized to view this ssh key."},
// 	)
// }

type VaultHandler struct {
	config    *config.Config
	cache     *cache.Cache
	validator *validate.Validator
	service   *VaultService
	isDev     bool
}

func NewVaultHandler(
	cfg *config.Config,
	cache *cache.Cache,
	validator *validate.Validator,
	service *VaultService,
) *VaultHandler {
	return &VaultHandler{
		config:    cfg,
		cache:     cache,
		validator: validator,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *VaultHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *VaultHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid or no token provided")
	}

	vaults, err := h.service.All(c.Request().Context(), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vaults)
}

func (h *VaultHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[VaultCreatePayload](c, h)
	if err != nil {
		return err
	}

	vault, err := h.service.Create(c.Request().Context(), *payload)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, vault)
}

// TODO: Get user from middleware
// TODO: Verify authorization for Vault by ID
func (h *VaultHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	payload, err := utils.BindAndValidatePayload[VaultUpdatePayload](c, h)
	if err != nil {
		return err
	}

	vault, err := h.service.Update(c.Request().Context(), int32(id), *payload)

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vault)
}

func (h *VaultHandler) Read(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))
	filter := c.QueryParam("filter")

	if limit == 0 {
		limit = 10
	}
	if page == 0 {
		page = 0
	}
	if filter == "" {
		filter = "all"
	}

	vault, err := h.service.Get(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	notes, err := h.service.PaginateNotes(
		c.Request().Context(),
		vault.ID,
		int32(page),
		int32(limit),
		filter == "orphans",
		filter == "untagged",
	)
	if err != nil {
		// TODO:
		return err
	}

	count, err := h.service.Count(
		c.Request().Context(),
		vault.ID,
		filter == "orphans",
		filter == "untagged",
	)
	if err != nil {
		// TODO:
		return err
	}

	fmt.Println(count)

	offset := page * limit
	hasMore := int(count)-offset > 0

	response := VaultWithNotesResponse{
		Vault:   vault,
		Notes:   notes,
		HasMore: hasMore,
	}

	return c.JSON(http.StatusOK, response)
}

func (h *VaultHandler) Delete(c echo.Context) error {
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
