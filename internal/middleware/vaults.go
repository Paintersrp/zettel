package middleware

import (
	"context"
	"fmt"
	"net/http"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/labstack/echo/v4"
)

const VaultsKey contextKey = "userID"

func VaultMiddleware(q *db.Queries) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			fmt.Println("here")
			// Retrieve the user from the context (set by the Authentication middleware)

			user, ok := c.Request().Context().Value(UserKey).(db.User)
			if !ok {
				next(c)
				return nil
			}
			fmt.Println("ok", ok)

			userID := pgtype.Int4{Int32: int32(user.ID), Valid: true}

			// Fetch the user's vaults from the database using the user's ID
			vaults, err := q.GetVaultsByUserLite(c.Request().Context(), userID)
			if err != nil {
				// Handle the error (e.g., return an appropriate response)
				return c.JSON(
					http.StatusInternalServerError,
					map[string]string{"error": "failed to fetch vaults"},
				)
			}

			fmt.Println("vaults", vaults)

			// Add the vaults to the context
			ctx := context.WithValue(c.Request().Context(), VaultsKey, vaults)
			c.SetRequest(c.Request().WithContext(ctx))

			return next(c)
		}
	}
}
