package db

import "github.com/jackc/pgx/v5/pgtype"

type UserWithVerification struct {
	ID                    int32              `json:"id"`
	Username              string             `json:"username"`
	HashedPassword        string             `json:"hashed_password"`
	Email                 string             `json:"email"`
	RoleID                pgtype.Int4        `json:"role_id"`
	ActiveVault           pgtype.Int4        `json:"active_vault"`
	CreatedAt             pgtype.Timestamptz `json:"created_at"`
	UpdatedAt             pgtype.Timestamptz `json:"updated_at"`
	VerificationID        pgtype.UUID        `json:"verification_id"`
	Bio                   pgtype.Text        `json:"bio"`
	PreferredName         pgtype.Text        `json:"preferred_name"`
	VerificationToken     pgtype.Text        `json:"verification_token"`
	VerificationExpiresAt pgtype.Timestamp   `json:"verification_expires_at"`
	VerificationCreatedAt pgtype.Timestamptz `json:"verification_created_at"`
	VerificationUpdatedAt pgtype.Timestamptz `json:"verification_updated_at"`
	VerificationStatus    pgtype.Text        `json:"verification_status"`
	VerificationEmail     pgtype.Text        `json:"verification_email"`
}
