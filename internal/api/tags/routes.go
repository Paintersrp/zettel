package tags

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *TagHandler,
	e *echo.Group,
) {
	api := e.Group("/tags")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/:id", h.Read)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)
}
