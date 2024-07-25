package trails

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *TrailHandler,
	e *echo.Group,
) {
	api := e.Group("/trails")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/search", h.Search)
	api.GET("/:id", h.Get)
	api.PUT("/:id", h.Update)
	api.DELETE("/:id", h.Delete)

	api.GET("/stats", h.GetTrailStats)
	api.POST("/:id/notes", h.AddNoteToTrail)
	api.DELETE("/:id/notes/:noteId", h.RemoveNoteFromTrail)
	api.PUT("/:id/notes/:noteId/position", h.UpdateNotePosition)
	api.GET("/:id/notes", h.GetTrailNotes)
	api.GET("/for-note/:noteId", h.GetTrailsForNote)
	api.POST("/:id/collaborators", h.AddCollaboratorToTrail)
	api.DELETE("/:id/collaborators/:userId", h.RemoveCollaboratorFromTrail)
	api.GET("/:id/collaborators", h.GetTrailCollaborators)

}
