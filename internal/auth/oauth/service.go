package oauth

import (
	"context"
	"encoding/json"
	"fmt"
	"io"

	"github.com/Paintersrp/zettel/internal/auth/user"
	"github.com/Paintersrp/zettel/internal/auth/utils"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/errors"
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

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	// TODO: Move
	var userInfo struct {
		ID            string `json:"sub"`
		Email         string `json:"email"`
		EmailVerified string `json:"email_verified"` // Unused
	}

	if err := json.Unmarshal(data, &userInfo); err != nil {
		return "", fmt.Errorf("failed to unmarshal user info: %w", err)
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
	resp, err := client.Get("https://api.github.com/user")
	if err != nil {
		return "", fmt.Errorf("failed to get user info: %w", err)
	}
	defer resp.Body.Close()

	var userInfo struct {
		Email string `json:"email"`
		Login string `json:"login"`
		ID    int    `json:"id"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&userInfo); err != nil {
		return "", fmt.Errorf("failed to decode user info: %w", err)
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
	newUser, err := s.userService.Register(ctx, autoUsername, email, autoPassword)
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

func (s *OAuthService) getUserByEmailOrRegister(
	ctx context.Context,
	email string,
) (*db.UserWithVerification, error) {
	user, err := s.userService.GetUserByEmail(ctx, email)
	if err != nil {
		autoUsername := utils.GenerateUsername(email)
		autoPassword := utils.GeneratePassword()
		user, err = s.userService.Register(ctx, autoUsername, email, autoPassword)
		if err != nil {
			return nil, fmt.Errorf("failed to register user: %w", err)
		}
	}

	return user, nil
}

func convertToUserWithVerification(
	userRow db.GetUserByProviderRow,
) *db.UserWithVerification {
	return &db.UserWithVerification{
		ID:                    userRow.ID,
		Username:              userRow.Username,
		HashedPassword:        userRow.HashedPassword,
		Email:                 userRow.Email,
		RoleID:                userRow.RoleID,
		CreatedAt:             userRow.CreatedAt,
		UpdatedAt:             userRow.UpdatedAt,
		VerificationID:        userRow.VerificationID,
		Bio:                   userRow.Bio,
		PreferredName:         userRow.PreferredName,
		VerificationToken:     userRow.VerificationToken,
		VerificationExpiresAt: userRow.VerificationExpiresAt,
		VerificationCreatedAt: userRow.VerificationCreatedAt,
		VerificationUpdatedAt: userRow.VerificationUpdatedAt,
		VerificationStatus:    userRow.VerificationStatus,
		VerificationEmail:     userRow.VerificationEmail,
	}
}
