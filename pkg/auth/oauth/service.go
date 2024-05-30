package oauth

import (
	"context"
	"fmt"

	db "github.com/Paintersrp/zettel/internal/db"
)

type OAuthService struct {
	queries *db.Queries
}

func NewOAuthService(queries *db.Queries) *OAuthService {
	return &OAuthService{
		queries: queries,
	}
}

func (s *OAuthService) GetUserByEmail(
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
