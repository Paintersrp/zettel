package noteTags

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *NoteTagHandler,
	e *echo.Group,
) {
	api := e.Group("/notetags")

	api.GET("", h.All)
}
