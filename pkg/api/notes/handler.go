package notes

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

	err = h.service.Delete(context.Background(), id)
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
