package vaults

import (
	"context"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

type VaultHandler struct {
	validator *validate.Validator
	config    *config.Config
	db        *db.Queries
	cache     *cache.Cache
	isDev     bool
}

func NewVaultHandler(
	cfg *config.Config,
	db *db.Queries,
	cache *cache.Cache,
) *VaultHandler {
	validator := validate.New()

	return &VaultHandler{
		validator: validator,
		config:    cfg,
		db:        db,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *VaultHandler) All(c echo.Context) error {
	userID, err := strconv.Atoi(c.QueryParam("userid"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}
	id := pgtype.Int4{Int32: int32(userID), Valid: true}
	vaults, err := h.db.GetVaultsByUser(context.Background(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vaults)
}

func (h *VaultHandler) Create(c echo.Context) error {
	var payload struct {
		Name   string `json:"name" validate:"required"`
		UserID int32  `json:"user_id" validate:"required"`
	}

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.validator.Validate(payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	id := pgtype.Int4{Int32: int32(payload.UserID), Valid: true}

	vault, err := h.db.CreateVault(context.Background(), db.CreateVaultParams{
		Name:   payload.Name,
		UserID: id,
	})
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, vault)
}

func (h *VaultHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	var payload struct {
		Name string `json:"name" validate:"required"`
	}

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.validator.Validate(payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	vault, err := h.db.UpdateVault(context.Background(), db.UpdateVaultParams{
		ID:   int32(id),
		Name: payload.Name,
	})
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

	vault, err := h.db.GetVault(context.Background(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vault)
}

func (h *VaultHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	err = h.db.DeleteVault(context.Background(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}
