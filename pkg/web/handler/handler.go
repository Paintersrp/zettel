package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/Paintersrp/zettel/internal/cache"
	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/api/notes"
	"github.com/Paintersrp/zettel/pkg/web/utils"
	"github.com/Paintersrp/zettel/pkg/web/views/pages"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

type Handler struct {
	validator *validate.Validator
	config    *config.Config
	cache     *cache.Cache
	db        *db.Queries
	isDev     bool
}

func NewHandler(cfg *config.Config, db *db.Queries, cache *cache.Cache) *Handler {
	validator := validate.New()

	return &Handler{
		validator: validator,
		config:    cfg,
		db:        db,
		cache:     cache,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *Handler) Login(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/")
	} else {
		return utils.RenderWithCaching(
			c,
			http.StatusOK,
			pages.Login(user),
			h.cache,
			utils.GetTTLByEnv(h.isDev, 1*time.Minute),
		)

	}
}

func (h *Handler) Register(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/")
	} else {
		return utils.RenderWithCaching(
			c,
			http.StatusOK,
			pages.Register(user),
			h.cache,
			utils.GetTTLByEnv(h.isDev, 1*time.Minute),
		)
	}
}

func (h *Handler) Home(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if ok {
		return utils.Render(c, http.StatusOK, pages.Home(user))
	} else {
		return utils.Render(c, http.StatusOK, pages.Home(user))
	}
}

func (h *Handler) Notes(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	userID := pgtype.Int4{Int32: int32(user.ID), Valid: true}
	rows, err := h.db.GetNotesByUser(c.Request().Context(), userID)

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	var notesWithDetails []notes.NoteWithDetails
	for _, row := range rows {
		var note notes.NoteWithDetails
		note.ID = row.ID
		note.Title = row.Title
		note.UserID = row.UserID
		note.VaultID = row.VaultID
		note.Upstream = row.Upstream
		note.Content = row.Content
		note.CreatedAt = row.CreatedAt
		note.UpdatedAt = row.UpdatedAt

		tags, err := unmarshalTags(row.Tags)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		note.Tags = tags

		linkedNotes, err := unmarshalLinkedNotes(row.LinkedNotes)
		if err != nil {
			return echo.NewHTTPError(http.StatusBadRequest, err.Error())
		}
		note.LinkedNotes = linkedNotes

		notesWithDetails = append(notesWithDetails, note)
	}

	return utils.Render(c, http.StatusOK, pages.Notes(notesWithDetails, user))
}

func (h *Handler) Note(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Invalid note ID")
	}

	row, err := h.db.GetNote(c.Request().Context(), int32(id))

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	notewithDetails := notes.NoteWithDetails{
		ID:        row.ID,
		Title:     row.Title,
		UserID:    row.UserID,
		VaultID:   row.VaultID,
		Upstream:  row.Upstream,
		Content:   row.Content,
		CreatedAt: row.CreatedAt,
		UpdatedAt: row.UpdatedAt,
	}

	tags, err := unmarshalTags(row.Tags)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	notewithDetails.Tags = tags

	linkedNotes, err := unmarshalLinkedNotes(row.LinkedNotes)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	notewithDetails.LinkedNotes = linkedNotes

	return utils.Render(c, http.StatusOK, pages.Note(notewithDetails, user))
}

func unmarshalTags(tags interface{}) ([]notes.Tag, error) {
	var t []notes.Tag
	tagsBytes, err := json.Marshal(tags)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(tagsBytes, &t)
	if err != nil {
		return nil, err
	}

	// Filter out tags with ID 0
	var filteredTags []notes.Tag
	for _, tag := range t {
		if tag.ID != 0 {
			filteredTags = append(filteredTags, tag)
		}
	}

	return filteredTags, nil
}

func unmarshalLinkedNotes(linkedNotes interface{}) ([]notes.LinkedNote, error) {
	var ln []notes.LinkedNote
	linkedNotesBytes, err := json.Marshal(linkedNotes)
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(linkedNotesBytes, &ln)
	if err != nil {
		return nil, err
	}

	// Filter out linked notes with ID 0
	var filteredLinkedNotes []notes.LinkedNote
	for _, linkedNote := range ln {
		if linkedNote.ID != 0 {
			filteredLinkedNotes = append(filteredLinkedNotes, linkedNote)
		}
	}

	return filteredLinkedNotes, nil
}
