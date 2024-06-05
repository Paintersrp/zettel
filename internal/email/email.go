package email

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/service/ses"
)

type Email struct {
	From     string
	Subject  string
	TextBody string
	HTMLBody string
	To       []string
}

func (e *Email) Send() error {
	svc := GetSESSession()
	input := &ses.SendEmailInput{
		Destination: &ses.Destination{
			ToAddresses: aws.StringSlice(e.To),
		},
		Message: &ses.Message{
			Body: &ses.Body{
				Text: &ses.Content{
					Charset: aws.String("UTF-8"),
					Data:    aws.String(e.TextBody),
				},
			},
			Subject: &ses.Content{
				Charset: aws.String("UTF-8"),
				Data:    aws.String(e.Subject),
			},
		},
		Source: aws.String(e.From),
	}
	_, err := svc.SendEmail(input)
	return err
}
