package remote

import (
	"context"
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/api/notes"
	"github.com/labstack/echo/v4"
)

type RemoteHandler struct {
	validator     *validate.Validator
	config        *config.Config
	db            *db.Queries
	cache         *cache.Cache
	remoteService *RemoteService
	noteService   *notes.NoteService
	isDev         bool
}

func NewRemoteHandler(
	cfg *config.Config,
	db *db.Queries,
	cache *cache.Cache,
	remoteService *RemoteService,
	noteService *notes.NoteService,
) *RemoteHandler {
	validator := validate.New()

	return &RemoteHandler{
		validator:     validator,
		config:        cfg,
		db:            db,
		cache:         cache,
		remoteService: remoteService,
		noteService:   noteService,
		isDev:         cfg.Environment == "dev",
	}
}

func (h *RemoteHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *RemoteHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[notes.NotePayload](c, h)
	if err != nil {
		return err
	}

	note, err := h.noteService.Create(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	err = h.remoteService.CreateNoteChange(c.Request().Context(), note)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, note)
}

// TODO: Unimplemented
// TODO: Use remote note ID to get actual note ID for updating
func (h *RemoteHandler) Update(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	payload, err := utils.BindAndValidatePayload[notes.NotePayload](c, h)
	if err != nil {
		return err
	}

	note, err := h.noteService.Update(id, c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	err = h.remoteService.UpdateNoteChange(c.Request().Context(), note)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, note)
}

// TODO: Unimplemented
// TODO: Use remote note ID to get actual note ID for updating
func (h *RemoteHandler) Delete(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	err = h.noteService.Delete(context.Background(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	err = h.remoteService.DeleteNoteChange(c.Request().Context(), int32(id))
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

// ProcessRemoteChanges marks all unprocessed remote changes as processed
// TODO: A little repeaty...
func (h *RemoteHandler) ProcessChanges(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
	}

	unprocessedNoteChanges, err := h.remoteService.GetUnprocessedChanges(
		c.Request().Context(),
		int32(user.ID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedTagChanges, err := h.remoteService.GetUnprocessedTagChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedLinkChanges, err := h.remoteService.GetUnprocessedLinkChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	for _, change := range unprocessedNoteChanges {
		err = h.remoteService.MarkChangeProcessed(c.Request().Context(), change.ID)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	for _, change := range unprocessedTagChanges {
		err = h.remoteService.MarkTagChangeProcessed(
			c.Request().Context(),
			change.ID,
		)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	for _, change := range unprocessedLinkChanges {
		err = h.remoteService.MarkLinkChangeProcessed(
			c.Request().Context(),
			change.ID,
		)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
		}
	}

	return c.NoContent(http.StatusOK)
}

func (h *RemoteHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusUnauthorized, "Unauthorized")
	}

	unprocessedNoteChanges, err := h.remoteService.GetUnprocessedChanges(
		c.Request().Context(),
		int32(user.ID),
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedTagChanges, err := h.remoteService.GetUnprocessedTagChanges(
		c.Request().Context(),
		user.ID,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	unprocessedLinkChanges, err := h.remoteService.GetUnprocessedLinkChanges(
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
