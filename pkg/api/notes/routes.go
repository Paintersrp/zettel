package notes

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *NoteHandler,
	e *echo.Group,
) {
	api := e.Group("/notes")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/:id", h.Read)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)
}
