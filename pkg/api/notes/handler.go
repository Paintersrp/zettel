package notes

import (
	"context"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type NoteHandler struct {
	validator *validate.Validator
	config    *config.Config
	db        *db.Queries
	cache     *cache.Cache
	service   *NoteService
	isDev     bool
}

func NewNoteHandler(
	cfg *config.Config,
	db *db.Queries,
	cache *cache.Cache,
	service *NoteService,
) *NoteHandler {
	validator := validate.New()

	return &NoteHandler{
		validator: validator,
		config:    cfg,
		db:        db,
		cache:     cache,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *NoteHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	notes, err := h.service.All(c.Request().Context(), int(user.ID))

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, notes)
}

func (h *NoteHandler) Create(c echo.Context) error {
	var payload NotePayload

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	note, err := h.service.Create(c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusCreated, note)
}

func (h *NoteHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	var payload NotePayload

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	note, err := h.service.Update(id, c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) Read(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	note, err := h.service.Read(c.Request().Context(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	err = h.service.Delete(context.Background(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *NoteHandler) UpdateByTitle(c echo.Context) error {
	var payload NotePayload

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	note, err := h.service.UpdateByTitle(c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) DeleteByTitle(c echo.Context) error {
	var payload NoteDeletePayload
	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	err := h.service.DeleteByTitle(c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *NoteHandler) BulkOperations(c echo.Context) error {
	var payload BulkNoteOperationPayload
	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	for _, op := range payload.Operations {
		switch op.Operation {
		case "create":
			if op.UpdatePayload == nil {
				return echo.NewHTTPError(http.StatusBadRequest, "missing create payload")
			}
			_, err := h.service.Create(c.Request().Context(), *op.UpdatePayload)
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
		case "update":
			if op.UpdatePayload == nil {
				return echo.NewHTTPError(http.StatusBadRequest, "missing update payload")
			}
			_, err := h.service.UpdateByTitle(c.Request().Context(), *op.UpdatePayload)
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
		case "delete":
			if op.DeletePayload == nil {
				return echo.NewHTTPError(http.StatusBadRequest, "missing delete payload")
			}
			err := h.service.DeleteByTitle(c.Request().Context(), *op.DeletePayload)
			if err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
		default:
			return echo.NewHTTPError(http.StatusBadRequest, "invalid operation type")
		}
	}

	return c.NoContent(http.StatusOK)
}

func (h *NoteHandler) RemoteNoteCreate(c echo.Context) error {
	var payload NotePayload

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	note, err := h.service.Create(c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	err = h.service.CreateRemoteNoteChange(c.Request().Context(), note)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, note)
}

func (h *NoteHandler) RemoteNoteUpdate(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	var payload NotePayload

	if err := c.Bind(&payload); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	note, err := h.service.Update(id, c.Request().Context(), payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	err = h.service.UpdateRemoteNoteChange(c.Request().Context(), note)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) RemoteNoteDelete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	err = h.service.Delete(context.Background(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	err = h.service.DeleteRemoteNoteChange(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

// ProcessRemoteChanges marks all unprocessed remote changes as processed
func (h *NoteHandler) ProcessRemoteChanges(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
	}

	unprocessedNoteChanges, err := h.service.GetUnprocessedRemoteChanges(
		c.Request().Context(),
		int32(user.ID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedTagChanges, err := h.service.GetUnprocessedRemoteTagChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedLinkChanges, err := h.service.GetUnprocessedRemoteLinkChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	for _, change := range unprocessedNoteChanges {
		err = h.service.MarkRemoteChangeProcessed(c.Request().Context(), change.ID)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	for _, change := range unprocessedTagChanges {
		err = h.service.MarkRemoteTagChangeProcessed(c.Request().Context(), change.ID)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	for _, change := range unprocessedLinkChanges {
		err = h.service.MarkRemoteLinkChangeProcessed(c.Request().Context(), change.ID)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	return c.NoContent(http.StatusOK)
}

type ChangesPayload struct {
	Notes []db.RemoteChange
	Tags  []db.RemoteTagChange
	Links []db.RemoteLinkChange
}

func (h *NoteHandler) GetRemoteChanges(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
	}

	unprocessedNoteChanges, err := h.service.GetUnprocessedRemoteChanges(
		c.Request().Context(),
		int32(user.ID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedTagChanges, err := h.service.GetUnprocessedRemoteTagChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedLinkChanges, err := h.service.GetUnprocessedRemoteLinkChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ChangesPayload{
		Notes: unprocessedNoteChanges,
		Tags:  unprocessedTagChanges,
		Links: unprocessedLinkChanges,
	})
}
