package oauth

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/pkg/auth/user"
	"github.com/Paintersrp/zettel/pkg/auth/utils"
	"golang.org/x/oauth2"
)

type OAuthService struct {
	queries     *db.Queries
	userService *user.UserService
}

func NewOAuthService(queries *db.Queries, userService *user.UserService) *OAuthService {
	return &OAuthService{
		queries:     queries,
		userService: userService,
	}
}

func (s *OAuthService) HandleGoogleCallback(
	ctx context.Context,
	code string,
	config *oauth2.Config,
	secret string,
) (string, error) {
	token, err := config.Exchange(ctx, code)
	if err != nil {
		return "", fmt.Errorf("failed to exchange code for token: %w", err)
	}

	client := config.Client(ctx, token)
	resp, err := client.Get(googleUserInfoURL)
	if err != nil {
		return "", fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	var userInfo struct {
		Email string `json:"email"`
	}

	if err := json.Unmarshal(data, &userInfo); err != nil {
		return "", fmt.Errorf("failed to unmarshal user info: %w", err)
	}

	user, err := s.getUserByEmailOrRegister(ctx, userInfo.Email)
	if err != nil {
		return "", fmt.Errorf("failed to get or register user: %w", err)
	}

	loginToken, err := utils.GenerateJWT(user, secret, 24*60)
	if err != nil {
		return "", fmt.Errorf("failed to generate JWT token: %w", err)
	}

	return loginToken, nil
}

func (s *OAuthService) HandleGitHubCallback(
	ctx context.Context,
	code string,
	config *oauth2.Config,
	secret string,
) (string, error) {
	token, err := config.Exchange(ctx, code)
	if err != nil {
		return "", fmt.Errorf("failed to exchange code for token: %w", err)
	}

	client := config.Client(ctx, token)
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return "", fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	var userInfo struct {
		Email string `json:"email"`
		Login string `json:"login"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return "", fmt.Errorf("failed to decode user info: %w", err)
	}

	if userInfo.Email == "" {
		userInfo.Email = utils.GenerateGithubEmail(userInfo.Login)
	}

	user, err := s.getUserByEmailOrRegister(ctx, userInfo.Email)
	if err != nil {
		return "", fmt.Errorf("failed to get or register user: %w", err)
	}

	loginToken, err := utils.GenerateJWT(user, secret, 24*60)
	if err != nil {
		return "", fmt.Errorf("failed to generate JWT token: %w", err)
	}

	return loginToken, nil
}

func (s *OAuthService) getUserByEmailOrRegister(
	ctx context.Context,
	email string,
) (*db.User, error) {
	user, err := s.userService.GetUserByEmail(ctx, email)
	if err != nil {
		autoUsername := utils.GenerateUsername(email)
		autoPassword := utils.GeneratePassword()
		user, err = s.userService.Register(ctx, autoUsername, email, autoPassword)
		if err != nil {
			return nil, fmt.Errorf("failed to register user: %w", err)
		}
	}

	fmt.Println(user)

	return user, nil
}
