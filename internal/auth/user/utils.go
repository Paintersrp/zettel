package user

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

func generateVerificationToken() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", fmt.Errorf("failed to generate random bytes: %w", err)
	}

	return base64.URLEncoding.EncodeToString(b), nil
}

func sendVerificationEmail(email, token string) error {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewEnvCredentials(),
	})
	if err != nil {
		return err
	}

	svc := ses.New(sess)

	// TODO: Dev / Prod strings
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: []*string{
				aws.String(email),
			},
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data: aws.String(
						"Please click the following link to verify your email address:\n\nhttp://localhost:5173/verify?token=" + token,
					),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String("Zethub - Email Verification"),
			},
		},
		Source: aws.String("do_not_reply@srpainter.com"),
	}

	_, err = svc.SendEmail(input)
	if err != nil {
		return err
	}

	return nil
}
