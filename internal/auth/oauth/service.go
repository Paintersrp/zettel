package oauth

import (
	"context"
	"fmt"

	"github.com/Paintersrp/zettel/internal/auth/user"
	"github.com/Paintersrp/zettel/internal/auth/utils"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/errors"
	ut "github.com/Paintersrp/zettel/internal/utils"
	"github.com/jackc/pgx/v5"
	"golang.org/x/oauth2"
)

type OAuthService struct {
	db          *db.Queries
	userService *user.UserService
}

func NewOAuthService(db *db.Queries, userService *user.UserService) *OAuthService {
	return &OAuthService{
		db:          db,
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

	userInfo, err := ut.BindOAuthResponsePayload[GooglePayload](resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to bind oauth payload: %w", err)
	}

	userData, err := s.handleOAuthLogin(
		ctx,
		"google",
		userInfo.ID,
		userInfo.Email,
	)
	if err != nil {
		return "", fmt.Errorf("failed to handle OAuth login: %w", err)
	}

	loginToken, err := utils.GenerateJWT(userData, secret, 24*60)
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
	resp, err := client.Get(githubUserInfoURL)
	if err != nil {
		return "", fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	userInfo, err := ut.BindOAuthResponsePayload[GithubPayload](resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to bind oauth payload: %w", err)
	}

	if userInfo.Email == "" {
		userInfo.Email = utils.GenerateGithubEmail(userInfo.Login)
	}

	userData, err := s.handleOAuthLogin(
		ctx,
		"github",
		fmt.Sprint(userInfo.ID),
		userInfo.Email,
	)
	if err != nil {
		return "", fmt.Errorf("failed to get or register user: %w", err)
	}

	loginToken, err := utils.GenerateJWT(userData, secret, 24*60)
	if err != nil {
		return "", fmt.Errorf("failed to generate JWT token: %w", err)
	}

	return loginToken, nil
}

func (s *OAuthService) handleOAuthLogin(
	ctx context.Context,
	provider, providerUserID, email string,
) (*db.UserWithVerification, error) {
	existingUser, err := s.db.GetUserByProvider(ctx, db.GetUserByProviderParams{
		Name:           provider,
		ProviderUserID: providerUserID,
	})

	if err != nil && err != pgx.ErrNoRows {
		return nil, fmt.Errorf(
			"failed to get user by provider and provider user ID: %w",
			err,
		)
	}
	if err == nil {
		formattedUser := &db.UserWithVerification{
			ID:                 existingUser.ID,
			Username:           existingUser.Username,
			Email:              existingUser.Email,
			RoleID:             existingUser.RoleID,
			VerificationID:     existingUser.VerificationID,
			PreferredName:      existingUser.PreferredName,
			VerificationStatus: existingUser.VerificationStatus,
			VerificationEmail:  existingUser.VerificationEmail,
		}
		return formattedUser, nil
	}

	existingUserByEmail, err := s.userService.GetUserByEmail(ctx, email)

	if err != nil && err.Error() != errors.ErrUserNoRows.Error() {
		return nil, fmt.Errorf("failed to get user by email: %w", err)
	}
	if existingUserByEmail != nil {
		return nil, fmt.Errorf(
			"email %s is already registered, please link your account",
			email,
		)
	}

	autoUsername := utils.GenerateUsername(email)
	autoPassword := utils.GeneratePassword()
	newUser, err := s.userService.Register(
		ctx,
		autoUsername,
		email,
		autoPassword,
		provider,
		false,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to register user: %w", err)
	}

	err = s.db.AddProviderForUser(ctx, db.AddProviderForUserParams{
		Email:          email,
		Name:           provider,
		ProviderUserID: providerUserID,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to add social login for user: %w", err)
	}

	// GitHub does not provide a verified email.
	if provider == "google" {
		_, err = s.db.UpdateVerificationStatus(ctx, db.UpdateVerificationStatusParams{
			ID:     newUser.VerificationID,
			Status: "verified",
		})
		if err != nil {
			return nil, fmt.Errorf(
				"failed to update verification status for user: %w",
				err,
			)
		}
	}

	return newUser, nil
}
