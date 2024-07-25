package utils

import (
	"net/http"
	"time"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/golang-jwt/jwt"
	"github.com/jackc/pgx/v5/pgtype"
)

type Claims struct {
	jwt.StandardClaims
	UserID             int64       `json:"id"`
	Username           string      `json:"username"`
	Email              string      `json:"email"`
	Bio                pgtype.Text `json:"bio"`
	PreferredName      pgtype.Text `json:"preferred_name"`
	RoleID             pgtype.Int4 `json:"role_id"`
	Onboarding         bool        `json:"onboarding"`
	OnboardingFrom     pgtype.Text `json:"onboarding_from"`
	ActiveVault        pgtype.Int4 `json:"active_vault"`
	VerificationID     pgtype.Int4 `json:"verification_id"`
	VerificationStatus pgtype.Text `json:"verification_status"`
	VerificationEmail  pgtype.Text `json:"verification_email"`
}

func GenerateJWT(
	user *db.UserWithVerification,
	secret string,
	expirationHours int64,
) (string, error) {
	claims := &Claims{
		UserID:             int64(user.ID),
		Username:           user.Username,
		Email:              user.Email,
		Bio:                user.Bio,
		PreferredName:      user.PreferredName,
		RoleID:             user.RoleID,
		Onboarding:         user.Onboarding,
		OnboardingFrom:     user.OnboardingFrom,
		VerificationID:     user.VerificationID,
		VerificationStatus: user.VerificationStatus,
		VerificationEmail:  user.VerificationEmail,
		ActiveVault:        user.ActiveVault,
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
		HttpOnly: false,
	}
	http.SetCookie(w, cookie)
}
