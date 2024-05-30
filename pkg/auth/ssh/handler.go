package ssh

import (
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/utils"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
)

type SSHHandler struct {
	db        *db.Queries
	service   *SSHService
	validator *validate.Validator
	config    *config.Config
}

func NewSSHHandler(
	queries *db.Queries,
	cfg *config.Config,
	sshService *SSHService,
	validator *validate.Validator,
) *SSHHandler {
	return &SSHHandler{
		db:        queries,
		service:   sshService,
		validator: validator,
		config:    cfg,
	}
}

func (h *SSHHandler) Validator() *validate.Validator {
	return h.validator
}

func (h *SSHHandler) SaveSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	payload, err := utils.BindAndValidatePayload[SSHInput](c, h)
	if err != nil {
		return err
	}

	sshKey := &SSHKey{
		UserID:    user.ID,
		PublicKey: payload.PublicKey,
		Name:      payload.Name,
	}

	key, err := h.service.CreateSSHKey(c.Request().Context(), sshKey)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusOK, key)

}

func (h *SSHHandler) GetSSHKeys(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	keys, err := h.service.GetSSHKeys(c.Request().Context(), user.ID)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusOK, keys)
}

func (h *SSHHandler) GetSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to view this ssh key."},
		)
	}

	return c.JSON(http.StatusOK, key)
}

func (h *SSHHandler) UpdateSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	payload, err := utils.BindAndValidatePayload[SSHInput](c, h)
	if err != nil {
		return err
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to view this ssh key."},
		)
	}

	updatedKey, err := h.service.UpdateSSHKey(
		c.Request().Context(),
		int32(id),
		payload.PublicKey,
		payload.Name,
	)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusOK, updatedKey)
}

func (h *SSHHandler) DeleteSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		// TODO: Unified Unauthorized Return
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid ID"})
	}

	key, err := h.service.GetSSHKey(c.Request().Context(), int32(id))
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	// TODO: Need more of this
	if key.UserID != user.ID {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Not authorized to manage this ssh key."},
		)
	}

	if err := h.service.DeleteSSHKey(c.Request().Context(), int32(id)); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusNoContent, nil)
}
