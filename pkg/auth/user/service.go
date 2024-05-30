package user

import (
	"context"
	"errors"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
	"golang.org/x/crypto/bcrypt"

	db "github.com/Paintersrp/zettel/internal/db"
)

type UserService struct {
	queries *db.Queries
}

func NewUserService(queries *db.Queries) *UserService {
	return &UserService{
		queries: queries,
	}
}

func (s *UserService) Register(
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

func (s *UserService) Login(
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

func (s *UserService) ResetPassword(
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

func (s *UserService) GetUser(
	ctx context.Context,
	id int32,
) (*db.GetUserWithVaultsRow, error) {
	row, err := s.queries.GetUserWithVaults(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &db.GetUserWithVaultsRow{
		ID:       row.ID,
		Username: row.Username,
		Email:    row.Email,
		RoleName: row.RoleName,
		Vaults:   row.Vaults,
	}, nil
}
