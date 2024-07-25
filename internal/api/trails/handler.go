package trails

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

type TrailHandler struct {
	config    *config.Config
	cache     *cache.Cache
	validator *validate.Validator
	service   *TrailService
	isDev     bool
}

func NewTrailHandler(
	cfg *config.Config,
	cache *cache.Cache,
	validator *validate.Validator,
	service *TrailService,
) *TrailHandler {
	return &TrailHandler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *TrailHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *TrailHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[TrailPayload](c, h)
	if err != nil {
		return err
	}

	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}
	payload.UserID = user.ID

	trail, err := h.service.Create(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, trail)
}

func (h *TrailHandler) Get(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	trail, err := h.service.Get(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, trail)
}

func (h *TrailHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	payload, err := utils.BindAndValidatePayload[TrailPayload](c, h)
	if err != nil {
		return err
	}

	payload.ID = int32(id)

	trail, err := h.service.Update(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, trail)
}

func (h *TrailHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	err = h.service.Delete(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *TrailHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))

	if limit == 0 {
		limit = 10 // default limit
	}

	trails, err := h.service.All(
		c.Request().Context(),
		user.ID,
		int32(limit),
		int32(offset),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, trails)
}

func (h *TrailHandler) Search(c echo.Context) error {
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

	trails, err := h.service.Search(
		c.Request().Context(),
		user.ID,
		query,
		int32(limit),
		int32(offset),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, trails)
}

func (h *TrailHandler) AddNoteToTrail(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	payload, err := utils.BindAndValidatePayload[AddNoteToTrailPayload](c, h)
	if err != nil {
		return err
	}

	err = h.service.AddNoteToTrail(c.Request().Context(), int32(trailID), payload.NoteID)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.NoContent(http.StatusCreated)
}

func (h *TrailHandler) RemoveNoteFromTrail(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	noteID, err := strconv.Atoi(c.Param("noteId"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	err = h.service.RemoveNoteFromTrail(
		c.Request().Context(),
		int32(trailID),
		int32(noteID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *TrailHandler) UpdateNotePosition(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	payload, err := utils.BindAndValidatePayload[UpdateNotePositionPayload](c, h)
	if err != nil {
		return err
	}

	err = h.service.UpdateNotePosition(
		c.Request().Context(),
		int32(trailID),
		payload.NoteID,
		payload.Position,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func (h *TrailHandler) GetTrailNotes(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	notes, err := h.service.GetTrailNotes(c.Request().Context(), int32(trailID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, notes)
}

func (h *TrailHandler) GetTrailsForNote(c echo.Context) error {
	noteID, err := strconv.Atoi(c.Param("noteId"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	trails, err := h.service.GetTrailsForNote(c.Request().Context(), int32(noteID))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, trails)
}

func (h *TrailHandler) AddCollaboratorToTrail(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	payload, err := utils.BindAndValidatePayload[CollaboratorPayload](c, h)
	if err != nil {
		return err
	}

	collaborator, err := h.service.AddCollaboratorToTrail(
		c.Request().Context(),
		payload.UserID,
		int32(trailID),
		payload.Role,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, collaborator)
}

func (h *TrailHandler) RemoveCollaboratorFromTrail(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid user ID")
	}

	err = h.service.RemoveCollaboratorFromTrail(
		c.Request().Context(),
		int32(userID),
		int32(trailID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *TrailHandler) GetTrailCollaborators(c echo.Context) error {
	trailID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid trail ID")
	}

	collaborators, err := h.service.GetTrailCollaborators(
		c.Request().Context(),
		int32(trailID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, collaborators)
}

func (h *TrailHandler) ListCollaborativeTrails(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	offset, _ := strconv.Atoi(c.QueryParam("offset"))

	if limit == 0 {
		limit = 10 // default limit
	}

	trails, err := h.service.ListCollaborativeTrails(
		c.Request().Context(),
		user.ID,
		int32(limit),
		int32(offset),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, trails)
}

func (h *TrailHandler) GetTrailStats(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	stats, err := h.service.GetTrailStats(c.Request().Context(), user.ID)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, stats)
}

func (h *TrailHandler) GetMostRecentTrailActivity(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	limit, _ := strconv.Atoi(c.QueryParam("limit"))
	if limit == 0 {
		limit = 10 // default limit
	}

	activity, err := h.service.GetMostRecentTrailActivity(
		c.Request().Context(),
		user.ID,
		int32(limit),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, activity)
}
