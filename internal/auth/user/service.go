package user

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"

	db "github.com/Paintersrp/zettel/internal/db"
)

type UserService struct {
	db *db.Queries
}

func NewUserService(db *db.Queries) *UserService {
	return &UserService{
		db: db,
	}
}

func (s *UserService) Register(
	ctx context.Context,
	username, email, password string,
) (*db.UserWithVerification, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	roleID := pgtype.Int4{Int32: int32(3), Valid: true}

	arg := db.CreateUserParams{
		Username:       username,
		HashedPassword: string(hashedPassword),
		Email:          email,
		RoleID:         roleID,
	}

	user, err := s.db.CreateUser(ctx, arg)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	token, err := generateVerificationToken()
	if err != nil {
		return nil, fmt.Errorf("failed to generate verification token: %w", err)
	}

	expiresAt := pgtype.Timestamp{Time: time.Now().Add(24 * time.Hour), Valid: true}
	userID := pgtype.Int4{Int32: int32(user.ID), Valid: true}

	verification, err := s.db.CreateVerification(ctx, db.CreateVerificationParams{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
		Email:     user.Email,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create verification record: %w", err)
	}

	updatedUser, err := s.db.UpdateVerification(ctx, db.UpdateVerificationParams{
		ID:             user.ID,
		VerificationID: verification.ID,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to update user with verification_id: %w", err)
	}

	// TODO: Boolean send?
	// err = sendVerificationEmail(email, token)
	// if err != nil {
	// return nil, fmt.Errorf("failed to send verification email: %w", err)
	// }

	return &db.UserWithVerification{
		ID:                 updatedUser.ID,
		Username:           updatedUser.Username,
		Email:              updatedUser.Email,
		RoleID:             updatedUser.RoleID,
		VerificationID:     updatedUser.VerificationID,
		CreatedAt:          updatedUser.CreatedAt,
		UpdatedAt:          updatedUser.UpdatedAt,
		VerificationStatus: updatedUser.Status,
		VerificationEmail:  updatedUser.VerificationEmail,
	}, nil
}

func (s *UserService) Login(
	ctx context.Context,
	email, password string,
) (*db.UserWithVerification, error) {
	row, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(row.HashedPassword), []byte(password))
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	return &db.UserWithVerification{
		ID:                 row.ID,
		Username:           row.Username,
		Email:              row.Email,
		RoleID:             row.RoleID,
		CreatedAt:          row.CreatedAt,
		UpdatedAt:          row.UpdatedAt,
		VerificationID:     row.VerificationID,
		VerificationStatus: row.VerificationStatus,
		VerificationEmail:  row.VerificationEmail,
	}, nil
}

func (s *UserService) GetUser(
	ctx context.Context,
	id int32,
) (*db.GetUserWithVaultsRow, error) {
	row, err := s.db.GetUserWithVaults(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &row, nil
}

func (s *UserService) GetUserByEmail(
	ctx context.Context,
	email string,
) (*db.UserWithVerification, error) {
	row, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &db.UserWithVerification{
		ID:                 row.ID,
		Username:           row.Username,
		HashedPassword:     row.HashedPassword,
		Email:              row.Email,
		RoleID:             row.RoleID,
		CreatedAt:          row.CreatedAt,
		UpdatedAt:          row.UpdatedAt,
		VerificationID:     row.VerificationID,
		VerificationStatus: row.VerificationStatus,
	}, nil

}

func (s *UserService) CreateVerification(
	ctx context.Context,
	payload *SendVerificationEmailInput,
) (*db.UpdateVerificationRow, error) {
	token, err := generateVerificationToken()
	if err != nil {
		return nil, fmt.Errorf("failed to generate verification token: %w", err)
	}

	expiresAt := pgtype.Timestamp{Time: time.Now().Add(24 * time.Hour), Valid: true}
	userID := pgtype.Int4{Int32: int32(payload.ID), Valid: true}

	verification, err := s.db.CreateVerification(ctx, db.CreateVerificationParams{
		UserID:    userID,
		Token:     token,
		ExpiresAt: expiresAt,
		Email:     payload.Email,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create verification record: %w", err)
	}

	updatedUser, err := s.db.UpdateVerification(ctx, db.UpdateVerificationParams{
		ID:             payload.ID,
		VerificationID: verification.ID,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to update user with verification_id: %w", err)
	}

	return &updatedUser, nil
}

func (s *UserService) ResendVerificationEmail(
	ctx context.Context,
	payload *SendVerificationEmailInput,
) error {
	user, err := s.CreateVerification(ctx, payload)
	if err != nil {
		return err
	}

	err = sendVerificationEmail(user.Email, user.Token.String)
	if err != nil {
		return fmt.Errorf("failed to send verification email: %w", err)
	}

	return nil
}

func (s *UserService) UpdateProfile(
	ctx context.Context,
	payload *UpdateProfileInput,
	emailChanged bool,
) (*db.User, error) {
	args := db.UpdateUserProfileParams{
		ID:            payload.ID,
		Email:         payload.Email,
		Username:      payload.Username,
		Bio:           pgtype.Text{String: payload.Bio, Valid: true},
		PreferredName: pgtype.Text{String: payload.PreferredName, Valid: true},
	}

	row, err := s.db.UpdateUserProfile(ctx, args)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	if emailChanged {
		verificationArgs := SendVerificationEmailInput{
			ID:    row.ID,
			Email: row.Email,
		}
		err = s.ResendVerificationEmail(ctx, &verificationArgs)
		if err != nil {
			return nil, err
		}
	}

	return &row, nil
}

func (s *UserService) VerifyEmail(ctx context.Context, token string) error {
	verification, err := s.db.GetVerificationByToken(ctx, token)
	if err != nil {
		return fmt.Errorf("failed to get verification record: %w", err)
	}

	if time.Now().After(verification.ExpiresAt.Time) {
		return errors.New("verification token has expired")
	}

	_, err = s.db.UpdateVerificationStatus(ctx, db.UpdateVerificationStatusParams{
		ID:     verification.ID,
		Status: "verified",
	})
	if err != nil {
		return fmt.Errorf("failed to update verification status: %w", err)
	}

	return nil
}

func (s *UserService) ResetPassword(
	ctx context.Context,
	email, newPassword string,
) (*db.User, error) {
	row, err := s.db.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(newPassword),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	arg := db.UpdateUserParams{
		ID:             row.ID,
		Username:       row.Username,
		HashedPassword: string(hashedPassword),
		Email:          row.Email,
		RoleID:         row.RoleID,
	}

	updatedUser, err := s.db.UpdateUser(ctx, arg)
	if err != nil {
		return nil, fmt.Errorf("failed to update user: %w", err)
	}

	return &db.User{
		ID:        updatedUser.ID,
		Username:  updatedUser.Username,
		Email:     updatedUser.Email,
		RoleID:    updatedUser.RoleID,
		CreatedAt: updatedUser.CreatedAt,
		UpdatedAt: updatedUser.UpdatedAt,
	}, nil
}
