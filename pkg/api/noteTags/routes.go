package noteTags

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *NoteTagHandler,
	e *echo.Group,
) {
	api := e.Group("/notetags")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/:id", h.Read)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)
}
