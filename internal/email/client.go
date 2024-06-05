package email

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/ses"
)

var sesSession *ses.SES

func init() {
	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String("us-east-2"),
		Credentials: credentials.NewEnvCredentials(),
	})
	if err != nil {
		panic(err)
	}
	sesSession = ses.New(sess)
}

func GetSESSession() *ses.SES {
	return sesSession
}
