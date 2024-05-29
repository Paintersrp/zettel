package vaults

import (
	"context"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
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
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid or no token provided")
	}

	id := pgtype.Int4{Int32: user.ID, Valid: true}
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
		Commit string `json:"commit"`
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
		Commit: pgtype.Text{String: payload.Commit, Valid: true},
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
		Name   string `json:"name" validate:"required"`
		Commit string `json:"commit" validate:"required"`
	}

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	if err := h.validator.Validate(payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	vault, err := h.db.UpdateVault(context.Background(), db.UpdateVaultParams{
		ID:     int32(id),
		Name:   payload.Name,
		Commit: pgtype.Text{String: payload.Commit, Valid: true},
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, vault)
}

type VaultWithNotesResponse struct {
	Vault   db.Vault                  `json:"vault"`
	Notes   []db.GetPaginatedNotesRow `json:"notes"`
	HasMore bool                      `json:"has_more"`
}

func (h *VaultHandler) Read(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid vault ID")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	page, _ := strconv.Atoi(c.QueryParam("page"))

	if limit == 0 {
		limit = 10
	}
	if page == 0 {
		page = 0
	}

	vault, err := h.db.GetVault(
		c.Request().Context(),
		int32(id),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	vaultId := pgtype.Int4{Int32: vault.ID, Valid: true}

	notes, err := h.db.GetPaginatedNotes(
		c.Request().Context(),
		db.GetPaginatedNotesParams{
			VaultID: vaultId,
			Column2: int32(page),
			Column3: int32(limit),
		},
	)
	if err != nil {
		// TODO:
		return err
	}

	count, err := h.db.GetNoteCount(c.Request().Context(), vaultId)
	if err != nil {
		// TODO:
		return err
	}
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

	err = h.db.DeleteVault(context.Background(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *VaultHandler) GetVaultByName(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid or no token provided")
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

	id := pgtype.Int4{Int32: user.ID, Valid: true}

	vault, err := h.db.GetUserVaultByName(
		context.Background(),
		db.GetUserVaultByNameParams{
			Name:   payload.Name,
			UserID: id,
		},
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, vault)
}
