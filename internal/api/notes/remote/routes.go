package remote

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *RemoteHandler,
	e *echo.Group,
) {
	api := e.Group("/notes/remote")
	api.GET("", h.All)
	api.POST("", h.Create)
	// Get One?
	// api.PATCH("/:id", h.Update)
	// api.DELETE("/:id", h.Delete)
	api.POST("/process", h.ProcessChanges)
}
