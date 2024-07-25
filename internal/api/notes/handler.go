package notes

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

type NoteHandler struct {
	config    *config.Config
	cache     *cache.Cache
	validator *validate.Validator
	service   *NoteService
	isDev     bool
}

func NewNoteHandler(
	cfg *config.Config,
	cache *cache.Cache,
	validator *validate.Validator,
	service *NoteService,
) *NoteHandler {
	return &NoteHandler{
		validator: validator,
		config:    cfg,
		cache:     cache,
		service:   service,
		isDev:     cfg.Environment == "dev",
	}
}

func (h *NoteHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *NoteHandler) All(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	notes, err := h.service.All(c.Request().Context(), int(user.ID))

	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, notes)
}

func (h *NoteHandler) Create(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[NotePayload](c, h)
	if err != nil {
		return err
	}

	note, err := h.service.Create(c.Request().Context(), *payload)
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

	payload, err := utils.BindAndValidatePayload[NotePayload](c, h)
	if err != nil {
		return err
	}

	note, err := h.service.Update(id, c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	// TODO: Doesn't return full records for tags/links. do we want it to?
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

	err = h.service.Delete(c.Request().Context(), id)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *NoteHandler) UpdateByTitle(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[NotePayload](c, h)
	if err != nil {
		return err
	}

	note, err := h.service.UpdateByTitle(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, note)
}

func (h *NoteHandler) DeleteByTitle(c echo.Context) error {
	payload, err := utils.BindAndValidatePayload[NoteDeletePayload](c, h)
	if err != nil {
		return err
	}

	err = h.service.DeleteByTitle(c.Request().Context(), *payload)
	if err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

func (h *NoteHandler) BulkOperations(c echo.Context) error {
	// TODO: We added validation here... need to check scripts
	payload, err := utils.BindAndValidatePayload[BulkNoteOperationPayload](c, h)
	if err != nil {
		return err
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

func (h *NoteHandler) SearchNotes(c echo.Context) error {
	user, ok := c.Request().Context().Value(middleware.UserKey).(db.User)
	if !ok {
		return echo.NewHTTPError(http.StatusBadRequest, "No user found.")
	}

	searchQuery := c.QueryParam("q")

	// Handle empty search query
	if searchQuery == "" {
		return c.JSON(http.StatusOK, make([]db.SearchNotesRow, 0))
	}

	notes, err := h.service.SearchNotes(
		c.Request().Context(),
		user.ActiveVault,
		searchQuery,
	)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
	}

	// Handle no search results
	if len(notes) == 0 {
		return c.JSON(http.StatusOK, make([]db.SearchNotesRow, 0))
	}

	return c.JSON(http.StatusOK, notes)
}
