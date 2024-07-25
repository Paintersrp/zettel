package hubs

import (
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/pkg/cache"
	"github.com/Paintersrp/zettel/internal/pkg/middleware"
	"github.com/Paintersrp/zettel/internal/pkg/utils"
	"github.com/Paintersrp/zettel/internal/pkg/validate"
	"github.com/labstack/echo/v4"
)

type HubHandler struct {
	config    *config.Config
	cache     *cache.Cache
	validator *validate.Validator
	service   *HubService
	isDev     bool
}

func NewHubHandler(
	cfg *config.Config,
	cache *cache.Cache,
	validator *validate.Validator,
	service *HubService,
) *HubHandler {
	return &HubHandler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *HubHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *HubHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[HubPayload](c, h)
	if err != nil {
		return err
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}
	payload.UserID = user.ID

	hub, err := h.service.Create(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, hub)
}

func (h *HubHandler) Get(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	hub, err := h.service.Get(c.Request().Context(), int32(id), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, hub)
}

func (h *HubHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	payload, err := utils.BindAndValidatePayload[HubPayload](c, h)
	if err != nil {
		return err
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}
	payload.UserID = user.ID
	payload.ID = int32(id)

	hub, err := h.service.Update(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, hub)
}

func (h *HubHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	err = h.service.Delete(c.Request().Context(), int32(id), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *HubHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))

	if limit == 0 {
		limit = 10 // default limit
	}

	hubs, err := h.service.All(
		c.Request().Context(),
		user.ID,
		int32(limit),
		int32(offset),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, hubs)
}

func (h *HubHandler) Search(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	query := c.QueryParam("q")
	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))

	if limit == 0 {
		limit = 10 // default limit
	}

	hubs, err := h.service.Search(
		c.Request().Context(),
		user.ID,
		query,
		int32(limit),
		int32(offset),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, hubs)
}

func (h *HubHandler) GetWithDetails(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	hub, err := h.service.GetWithDetails(c.Request().Context(), int32(id), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, hub)
}

func (h *HubHandler) GetSources(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	sources, err := h.service.GetSources(c.Request().Context(), int32(id), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, sources)
}

func (h *HubHandler) AddCollaborator(c echo.Context) error {
	hubID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	payload, err := utils.BindAndValidatePayload[CollaboratorPayload](c, h)
	if err != nil {
		return err
	}

	collaborator, err := h.service.AddCollaborator(
		c.Request().Context(),
		int32(hubID),
		payload.UserID,
		db.CollaboratorRole(payload.Role),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, collaborator)
}

func (h *HubHandler) RemoveCollaborator(c echo.Context) error {
	hubID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}

	err = h.service.RemoveCollaborator(c.Request().Context(), int32(hubID), int32(userID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *HubHandler) GetCollaborators(c echo.Context) error {
	hubID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid hub ID")
	}

	collaborators, err := h.service.GetCollaborators(c.Request().Context(), int32(hubID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, collaborators)
}
