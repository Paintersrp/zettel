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
	api.PATCH("", h.UpdateByTitle)
	api.DELETE("", h.DeleteByTitle)
	api.GET("/:id", h.Read)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)

	api.POST("/bulk", h.BulkOperations)

	remoteApi := api.Group("/remote")
	remoteApi.GET("", h.GetRemoteChanges)
	remoteApi.POST("", h.RemoteNoteCreate)
	remoteApi.PATCH("/:id", h.RemoteNoteUpdate)
	remoteApi.DELETE("/:id", h.RemoteNoteDelete)
	remoteApi.POST("/process", h.ProcessRemoteChanges)
}
