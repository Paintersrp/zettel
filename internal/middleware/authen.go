package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	"github.com/Paintersrp/zettel/internal/auth/utils"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/labstack/echo/v4"
)

type contextKey string

const UserIDKey contextKey = "userID"
const UserKey contextKey = "user"

func Authentication(secret string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			token, err := getTokenFromRequest(c.Request())
			if err != nil || token == "" {
				return next(c)
			}
			claims, err := utils.ValidateJWT(token, secret)
			if err != nil {
				return c.JSON(
					http.StatusUnauthorized,
					map[string]string{"error": err.Error()},
				)
			}

			ctx := context.WithValue(c.Request().Context(), UserKey, db.User{
				ID:       int32(claims.UserID),
				Username: claims.Username,
				Email:    claims.Email,
				RoleID:   claims.RoleID,
			})
			c.SetRequest(c.Request().WithContext(ctx))

			return next(c)
		}
	}
}

func getTokenFromRequest(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader != "" {
		parts := strings.Split(authHeader, " ")
		if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
			return parts[1], nil
		}
	}

	cookie, err := r.Cookie("jwt")
	if err != nil {
		return "", errors.New("missing token")
	}
	return cookie.Value, nil
}
