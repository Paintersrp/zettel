package ssh

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(handler *SSHHandler, e *echo.Group) {
	e.POST("/keys", handler.SaveSSHKey)
	e.GET("/keys", handler.GetSSHKeys)
	e.GET("/keys/:id", handler.GetSSHKey)
	e.PATCH("/keys/:id", handler.UpdateSSHKey)
	e.DELETE("/keys/:id", handler.DeleteSSHKey)
}
