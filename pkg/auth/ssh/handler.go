package ssh

import (
	"net/http"
	"strconv"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	mid "github.com/Paintersrp/zettel/internal/middleware"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/ssh"
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

// TODO: SSH SSHHandler / Service
func (h *SSHHandler) SaveSSHKey(c echo.Context) error {
	user, ok := c.Request().Context().Value(mid.UserKey).(db.User)
	if !ok {
		return c.Redirect(http.StatusTemporaryRedirect, "/login")
	}

	// userID := pgtype.Int4{Int32: int32(user.ID), Valid: true}

	var input SSHInput
	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
	}
	publicKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(input.PublicKey))
	if err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid SSH public key"},
		)
	}

	fingerprint := ssh.FingerprintSHA256(publicKey)
	sshKey := &SSHKey{
		UserID:      user.ID,
		PublicKey:   input.PublicKey,
		Name:        input.Name,
		Fingerprint: fingerprint,
	}

	key, err := h.service.SaveSSHKey(c.Request().Context(), sshKey)

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

	var input struct {
		PublicKey string `json:"public_key" validate:"required"`
		Name      string `json:"name" validate:"required"`
	}

	if err := c.Bind(&input); err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid request body"},
		)
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

	publicKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(input.PublicKey))
	if err != nil {
		return c.JSON(
			http.StatusBadRequest,
			map[string]string{"error": "Invalid SSH public key"},
		)
	}

	fingerprint := ssh.FingerprintSHA256(publicKey)
	key, updateErr := h.service.UpdateSSHKey(
		c.Request().Context(),
		int32(id),
		input.PublicKey,
		input.Name,
		fingerprint,
	)
	if updateErr != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": updateErr.Error()},
		)
	}

	return c.JSON(http.StatusOK, key)
}

func (h *SSHHandler) DeleteSSHKey(c echo.Context) error {
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

	if err := h.service.DeleteSSHKey(c.Request().Context(), int32(id)); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	return c.JSON(http.StatusNoContent, nil)
}
