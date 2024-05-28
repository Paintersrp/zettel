package jwt

import (
	"net/http"
	"time"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/golang-jwt/jwt"
	"github.com/jackc/pgx/v5/pgtype"
)

type Claims struct {
	jwt.StandardClaims
	UserID   int64       `json:"user_id"`
	Username string      `json:"username"`
	Email    string      `json:"email"`
	RoleID   pgtype.Int4 `json:"role_id"`
}

func GenerateJWT(user *db.User, secret string, expirationHours int64) (string, error) {
	claims := &Claims{
		UserID:   int64(user.ID),
		Username: user.Username,
		Email:    user.Email,
		RoleID:   user.RoleID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Duration(expirationHours) * time.Hour).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func ValidateJWT(tokenString, secret string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(
		tokenString,
		&Claims{},
		func(token *jwt.Token) (interface{}, error) {
			return []byte(secret), nil
		},
	)
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*Claims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}

func GenerateCookie(token string) *http.Cookie {
	cookie := new(http.Cookie)
	cookie.Name = "jwt"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = false
	cookie.Path = "/"

	return cookie
}

func RemoveCookie(w http.ResponseWriter) {
	cookie := &http.Cookie{
		Name:     "jwt",
		Value:    "",
		Path:     "/",
		MaxAge:   -1, // Remove the cookie immediately
		HttpOnly: true,
	}
	http.SetCookie(w, cookie)
}
