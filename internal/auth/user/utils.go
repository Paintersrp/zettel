package user

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"

	"github.com/Paintersrp/zettel/internal/pkg/email"
)

func generateVerificationToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", fmt.Errorf("failed to generate random bytes: %w", err)
	}

	return base64.URLEncoding.EncodeToString(b), nil
}

func sendVerificationEmail(to, token string) error {
	email := &email.Email{
		From:    "do_not_reply@srpainter.com",
		To:      []string{to},
		Subject: "Zethub - Email Verification",
		HTMLBody: fmt.Sprintf(
			`<html><body><p>Please click the following link to verify your email address:</p><p><a href="http://localhost:5173/verify?token=%s">Verify Email</a></p></body></html>`,
			token,
		),
		TextBody: "Please click the following link to verify your email address:\n\nhttp://localhost:5173/verify?token=" + token,
	}
	err := email.Send()
	if err != nil {
		return err
	}

	return nil
}
