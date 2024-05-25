package vaults

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(
	h *VaultHandler,
	e *echo.Group,
) {
	api := e.Group("/vaults")

	api.POST("", h.Create)
	api.GET("", h.All)
	api.GET("/:id", h.Read)
	api.PATCH("/:id", h.Update)
	api.DELETE("/:id", h.Delete)
	api.POST("/find", h.GetVaultByName)
}
