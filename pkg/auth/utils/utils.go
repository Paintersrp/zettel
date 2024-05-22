package utils

import (
	"strconv"
	"strings"

	"golang.org/x/exp/rand"
)

func GenerateUsername(email string) string {
	username := strings.Split(email, "@")[0]
	randomNumber := strconv.Itoa(rand.Intn(1000))
	return username + randomNumber
}

func GeneratePassword() string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	b := make([]rune, 12)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func GenerateGithubEmail(username string) string {
	return username + "@github.com"
}
