package service

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"

	db "github.com/Paintersrp/zettel/internal/db"
)

type SSHKey struct {
	UserID      int32  `db:"user_id"`
	PublicKey   string `db:"public_key"`
	Name        string `db:"name"`
	Fingerprint string `db:"fingerprint"`
}

type AuthService struct {
	queries *db.Queries
}

func NewAuthService(queries *db.Queries) *AuthService {
	return &AuthService{
		queries: queries,
	}
}

func (s *AuthService) Register(
	ctx context.Context,
	username, email, password string,
) (*db.User, error) {
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

	user, err := s.queries.CreateUser(ctx, arg)
	if err != nil {
		return nil, fmt.Errorf("failed to create user: %w", err)
	}

	return &db.User{
		ID:             user.ID,
		Username:       user.Username,
		HashedPassword: user.HashedPassword,
		Email:          user.Email,
		RoleID:         user.RoleID,
		CreatedAt:      user.CreatedAt,
		UpdatedAt:      user.UpdatedAt,
	}, nil
}

func (s *AuthService) Login(
	ctx context.Context,
	email, password string,
) (*db.User, error) {
	row, err := s.queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	err = bcrypt.CompareHashAndPassword([]byte(row.HashedPassword), []byte(password))
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	return &db.User{
		ID:             row.ID,
		Username:       row.Username,
		HashedPassword: row.HashedPassword,
		Email:          row.Email,
		RoleID:         row.RoleID,
		CreatedAt:      row.CreatedAt,
		UpdatedAt:      row.UpdatedAt,
	}, nil
}

func (s *AuthService) ResetPassword(
	ctx context.Context,
	email, newPassword string,
) (*db.User, error) {
	row, err := s.queries.GetUserByEmail(ctx, email)
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

	updatedUser, err := s.queries.UpdateUser(ctx, arg)
	if err != nil {
		return nil, fmt.Errorf("failed to update user: %w", err)
	}

	return &db.User{
		ID:             updatedUser.ID,
		Username:       updatedUser.Username,
		HashedPassword: updatedUser.HashedPassword,
		Email:          updatedUser.Email,
		RoleID:         updatedUser.RoleID,
		CreatedAt:      updatedUser.CreatedAt,
		UpdatedAt:      updatedUser.UpdatedAt,
	}, nil
}

func (s *AuthService) GetUserByEmail(
	ctx context.Context,
	email string,
) (*db.User, error) {
	row, err := s.queries.GetUserByEmail(ctx, email)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &db.User{
		ID:             row.ID,
		Username:       row.Username,
		HashedPassword: row.HashedPassword,
		Email:          row.Email,
		RoleID:         row.RoleID,
		CreatedAt:      row.CreatedAt,
		UpdatedAt:      row.UpdatedAt,
	}, nil
}

func (s *AuthService) SaveSSHKey(ctx context.Context, key *SSHKey) error {
	t, err := s.queries.SaveSSHKey(ctx, db.SaveSSHKeyParams{
		UserID:      key.UserID,
		PublicKey:   key.PublicKey,
		Name:        key.Name,
		Fingerprint: key.Fingerprint,
	})
	fmt.Println(t)
	return err
}

func (s *AuthService) GetSSHKeys(
	ctx context.Context,
	userID int32,
) ([]db.SshKey, error) {
	return s.queries.GetSSHKeys(ctx, userID)
}

func (s *AuthService) GetSSHKey(
	ctx context.Context,
	id int32,
) (db.SshKey, error) {
	return s.queries.GetSSHKey(ctx, id)
}

func (s *AuthService) UpdateSSHKey(
	ctx context.Context,
	id int32,
	publicKey, name, fingerprint string,
) (db.SshKey, error) {
	return s.queries.UpdateSSHKey(
		ctx,
		db.UpdateSSHKeyParams{
			ID:          id,
			PublicKey:   publicKey,
			Name:        name,
			Fingerprint: fingerprint,
		},
	)
}

func (s *AuthService) DeleteSSHKey(ctx context.Context, id int32) error {
	return s.queries.DeleteSSHKey(ctx, id)
}
