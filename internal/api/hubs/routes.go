package hubs

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *HubHandler,
	e *echo.Group,
) {
	api := e.Group("/hubs")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/:id", h.Get)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)

	api.GET("/search", h.Search)
	api.GET("/:id/details", h.GetWithDetails)
	api.GET("/:id/sources", h.GetSources)
	api.GET("/:id/collaborators", h.GetCollaborators)
	api.POST("/:id/collaborators", h.AddCollaborator)
	api.DELETE("/:id/collaborators/:userId", h.RemoveCollaborator)

	// api.POST("/bulk", h.BulkOperations)
	// api.PATCH("", h.UpdateByName)
	// api.DELETE("", h.DeleteByName)
}
