// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: auth.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createUser = `-- name: CreateUser :one
WITH new_user AS (
    INSERT INTO users (username, hashed_password, email, role_id, verification_id, onboarding_from)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, username, hashed_password, email, role_id, created_at, updated_at, verification_id, bio, preferred_name, onboarding, onboarding_from, completed_tutorial, active_vault
)
SELECT 
    new_user.id, new_user.username, new_user.hashed_password, new_user.email, new_user.role_id, new_user.created_at, new_user.updated_at, new_user.verification_id, new_user.bio, new_user.preferred_name, new_user.onboarding, new_user.onboarding_from, new_user.completed_tutorial, new_user.active_vault,
    verifications.token AS verification_token,
    verifications.expires_at AS verification_expires_at,
    verifications.created_at AS verification_created_at,
    verifications.updated_at AS verification_updated_at,
    verifications.status AS verification_status
FROM 
    new_user
LEFT JOIN 
    verifications
ON 
    new_user.verification_id = verifications.id
`

type CreateUserParams struct {
	Username       string      `json:"username"`
	HashedPassword string      `json:"hashed_password"`
	Email          string      `json:"email"`
	RoleID         pgtype.Int4 `json:"role_id"`
	VerificationID pgtype.UUID `json:"verification_id"`
	OnboardingFrom pgtype.Text `json:"onboarding_from"`
}

type CreateUserRow struct {
	ID                    int32              `json:"id"`
	Username              string             `json:"username"`
	HashedPassword        string             `json:"hashed_password"`
	Email                 string             `json:"email"`
	RoleID                pgtype.Int4        `json:"role_id"`
	CreatedAt             pgtype.Timestamptz `json:"created_at"`
	UpdatedAt             pgtype.Timestamptz `json:"updated_at"`
	VerificationID        pgtype.UUID        `json:"verification_id"`
	Bio                   pgtype.Text        `json:"bio"`
	PreferredName         pgtype.Text        `json:"preferred_name"`
	Onboarding            bool               `json:"onboarding"`
	OnboardingFrom        pgtype.Text        `json:"onboarding_from"`
	CompletedTutorial     bool               `json:"completed_tutorial"`
	ActiveVault           pgtype.Int4        `json:"active_vault"`
	VerificationToken     pgtype.Text        `json:"verification_token"`
	VerificationExpiresAt pgtype.Timestamp   `json:"verification_expires_at"`
	VerificationCreatedAt pgtype.Timestamptz `json:"verification_created_at"`
	VerificationUpdatedAt pgtype.Timestamptz `json:"verification_updated_at"`
	VerificationStatus    pgtype.Text        `json:"verification_status"`
}

func (q *Queries) CreateUser(ctx context.Context, arg CreateUserParams) (CreateUserRow, error) {
	row := q.db.QueryRow(ctx, createUser,
		arg.Username,
		arg.HashedPassword,
		arg.Email,
		arg.RoleID,
		arg.VerificationID,
		arg.OnboardingFrom,
	)
	var i CreateUserRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
		&i.VerificationToken,
		&i.VerificationExpiresAt,
		&i.VerificationCreatedAt,
		&i.VerificationUpdatedAt,
		&i.VerificationStatus,
	)
	return i, err
}

const createVerification = `-- name: CreateVerification :one
INSERT INTO verifications (user_id, token, expires_at, email)
VALUES ($1, $2, $3, $4)
RETURNING id, user_id, email, token, expires_at, created_at, updated_at, status
`

type CreateVerificationParams struct {
	UserID    pgtype.Int4      `json:"user_id"`
	Token     string           `json:"token"`
	ExpiresAt pgtype.Timestamp `json:"expires_at"`
	Email     string           `json:"email"`
}

func (q *Queries) CreateVerification(ctx context.Context, arg CreateVerificationParams) (Verification, error) {
	row := q.db.QueryRow(ctx, createVerification,
		arg.UserID,
		arg.Token,
		arg.ExpiresAt,
		arg.Email,
	)
	var i Verification
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Email,
		&i.Token,
		&i.ExpiresAt,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Status,
	)
	return i, err
}

const deleteUser = `-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1
`

func (q *Queries) DeleteUser(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteUser, id)
	return err
}

const getUser = `-- name: GetUser :one
SELECT u.id, u.username, u.hashed_password, u.email, u.role_id, u.created_at, u.updated_at, u.verification_id, u.bio, u.preferred_name, u.onboarding, u.onboarding_from, u.completed_tutorial, u.active_vault, r.name AS role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.id = $1
`

type GetUserRow struct {
	ID                int32              `json:"id"`
	Username          string             `json:"username"`
	HashedPassword    string             `json:"hashed_password"`
	Email             string             `json:"email"`
	RoleID            pgtype.Int4        `json:"role_id"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
	UpdatedAt         pgtype.Timestamptz `json:"updated_at"`
	VerificationID    pgtype.UUID        `json:"verification_id"`
	Bio               pgtype.Text        `json:"bio"`
	PreferredName     pgtype.Text        `json:"preferred_name"`
	Onboarding        bool               `json:"onboarding"`
	OnboardingFrom    pgtype.Text        `json:"onboarding_from"`
	CompletedTutorial bool               `json:"completed_tutorial"`
	ActiveVault       pgtype.Int4        `json:"active_vault"`
	RoleName          UserRole           `json:"role_name"`
}

func (q *Queries) GetUser(ctx context.Context, id int32) (GetUserRow, error) {
	row := q.db.QueryRow(ctx, getUser, id)
	var i GetUserRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
		&i.RoleName,
	)
	return i, err
}

const getUserByEmail = `-- name: GetUserByEmail :one
SELECT 
    users.id, users.username, users.hashed_password, users.email, users.role_id, users.created_at, users.updated_at, users.verification_id, users.bio, users.preferred_name, users.onboarding, users.onboarding_from, users.completed_tutorial, users.active_vault,
    verifications.token AS verification_token,
    verifications.expires_at AS verification_expires_at,
    verifications.created_at AS verification_created_at,
    verifications.updated_at AS verification_updated_at,
    verifications.status AS verification_status,
    verifications.email AS verification_email
FROM 
    users
LEFT JOIN 
    verifications
ON 
    users.verification_id = verifications.id
WHERE 
    users.email = $1
`

type GetUserByEmailRow struct {
	ID                    int32              `json:"id"`
	Username              string             `json:"username"`
	HashedPassword        string             `json:"hashed_password"`
	Email                 string             `json:"email"`
	RoleID                pgtype.Int4        `json:"role_id"`
	CreatedAt             pgtype.Timestamptz `json:"created_at"`
	UpdatedAt             pgtype.Timestamptz `json:"updated_at"`
	VerificationID        pgtype.UUID        `json:"verification_id"`
	Bio                   pgtype.Text        `json:"bio"`
	PreferredName         pgtype.Text        `json:"preferred_name"`
	Onboarding            bool               `json:"onboarding"`
	OnboardingFrom        pgtype.Text        `json:"onboarding_from"`
	CompletedTutorial     bool               `json:"completed_tutorial"`
	ActiveVault           pgtype.Int4        `json:"active_vault"`
	VerificationToken     pgtype.Text        `json:"verification_token"`
	VerificationExpiresAt pgtype.Timestamp   `json:"verification_expires_at"`
	VerificationCreatedAt pgtype.Timestamptz `json:"verification_created_at"`
	VerificationUpdatedAt pgtype.Timestamptz `json:"verification_updated_at"`
	VerificationStatus    pgtype.Text        `json:"verification_status"`
	VerificationEmail     pgtype.Text        `json:"verification_email"`
}

func (q *Queries) GetUserByEmail(ctx context.Context, email string) (GetUserByEmailRow, error) {
	row := q.db.QueryRow(ctx, getUserByEmail, email)
	var i GetUserByEmailRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
		&i.VerificationToken,
		&i.VerificationExpiresAt,
		&i.VerificationCreatedAt,
		&i.VerificationUpdatedAt,
		&i.VerificationStatus,
		&i.VerificationEmail,
	)
	return i, err
}

const getUserWithVaults = `-- name: GetUserWithVaults :one
SELECT 
    u.id, 
    u.username, 
    u.email, 
    u.bio,
    u.preferred_name,
    u.onboarding,
    u.onboarding_from,
    u.completed_tutorial,
    u.active_vault AS active_vault_id,
    r.name AS role_name,
    v.status AS verification_status,
    v.email AS verification_email,
    COALESCE(
        json_agg(vlt.* ORDER BY vlt.created_at DESC) FILTER (WHERE vlt.id IS NOT NULL), 
        '[]'
    ) AS vaults,
    COALESCE(
        (SELECT row_to_json(active_vlt.*)
         FROM vaults active_vlt
         WHERE active_vlt.id = u.active_vault),
        NULL
    ) AS active_vault
FROM 
    users u
JOIN 
    roles r ON u.role_id = r.id
LEFT JOIN 
    verifications v ON u.verification_id = v.id
LEFT JOIN 
    vaults vlt ON u.id = vlt.user_id
LEFT JOIN 
    vaults active_vlt ON u.active_vault = active_vlt.id
WHERE 
    u.id = $1
GROUP BY 
    u.id, 
    r.name,
    v.token,
    v.expires_at,
    v.created_at,
    v.updated_at,
    v.email,
    v.status
`

type GetUserWithVaultsRow struct {
	ID                 int32       `json:"id"`
	Username           string      `json:"username"`
	Email              string      `json:"email"`
	Bio                pgtype.Text `json:"bio"`
	PreferredName      pgtype.Text `json:"preferred_name"`
	Onboarding         bool        `json:"onboarding"`
	OnboardingFrom     pgtype.Text `json:"onboarding_from"`
	CompletedTutorial  bool        `json:"completed_tutorial"`
	ActiveVaultID      pgtype.Int4 `json:"active_vault_id"`
	RoleName           UserRole    `json:"role_name"`
	VerificationStatus pgtype.Text `json:"verification_status"`
	VerificationEmail  pgtype.Text `json:"verification_email"`
	Vaults             interface{} `json:"vaults"`
	ActiveVault        interface{} `json:"active_vault"`
}

func (q *Queries) GetUserWithVaults(ctx context.Context, id int32) (GetUserWithVaultsRow, error) {
	row := q.db.QueryRow(ctx, getUserWithVaults, id)
	var i GetUserWithVaultsRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.Email,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVaultID,
		&i.RoleName,
		&i.VerificationStatus,
		&i.VerificationEmail,
		&i.Vaults,
		&i.ActiveVault,
	)
	return i, err
}

const getUsers = `-- name: GetUsers :many
SELECT u.id, u.username, u.hashed_password, u.email, u.role_id, u.created_at, u.updated_at, u.verification_id, u.bio, u.preferred_name, u.onboarding, u.onboarding_from, u.completed_tutorial, u.active_vault, r.name AS role_name
FROM users u
JOIN roles r ON u.role_id = r.id
ORDER BY u.created_at DESC
`

type GetUsersRow struct {
	ID                int32              `json:"id"`
	Username          string             `json:"username"`
	HashedPassword    string             `json:"hashed_password"`
	Email             string             `json:"email"`
	RoleID            pgtype.Int4        `json:"role_id"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
	UpdatedAt         pgtype.Timestamptz `json:"updated_at"`
	VerificationID    pgtype.UUID        `json:"verification_id"`
	Bio               pgtype.Text        `json:"bio"`
	PreferredName     pgtype.Text        `json:"preferred_name"`
	Onboarding        bool               `json:"onboarding"`
	OnboardingFrom    pgtype.Text        `json:"onboarding_from"`
	CompletedTutorial bool               `json:"completed_tutorial"`
	ActiveVault       pgtype.Int4        `json:"active_vault"`
	RoleName          UserRole           `json:"role_name"`
}

func (q *Queries) GetUsers(ctx context.Context) ([]GetUsersRow, error) {
	rows, err := q.db.Query(ctx, getUsers)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetUsersRow
	for rows.Next() {
		var i GetUsersRow
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.HashedPassword,
			&i.Email,
			&i.RoleID,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.VerificationID,
			&i.Bio,
			&i.PreferredName,
			&i.Onboarding,
			&i.OnboardingFrom,
			&i.CompletedTutorial,
			&i.ActiveVault,
			&i.RoleName,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getVerificationByToken = `-- name: GetVerificationByToken :one
SELECT id, user_id, email, token, expires_at, created_at, updated_at, status FROM verifications WHERE token = $1
`

func (q *Queries) GetVerificationByToken(ctx context.Context, token string) (Verification, error) {
	row := q.db.QueryRow(ctx, getVerificationByToken, token)
	var i Verification
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Email,
		&i.Token,
		&i.ExpiresAt,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Status,
	)
	return i, err
}

const updateOnboarding = `-- name: UpdateOnboarding :exec
UPDATE users
SET onboarding = $2
WHERE id = $1
`

type UpdateOnboardingParams struct {
	ID         int32 `json:"id"`
	Onboarding bool  `json:"onboarding"`
}

func (q *Queries) UpdateOnboarding(ctx context.Context, arg UpdateOnboardingParams) error {
	_, err := q.db.Exec(ctx, updateOnboarding, arg.ID, arg.Onboarding)
	return err
}

const updatePassword = `-- name: UpdatePassword :one
UPDATE users
SET hashed_password = $2
WHERE id = $1
RETURNING id, username, hashed_password, email, role_id, created_at, updated_at, verification_id, bio, preferred_name, onboarding, onboarding_from, completed_tutorial, active_vault
`

type UpdatePasswordParams struct {
	ID             int32  `json:"id"`
	HashedPassword string `json:"hashed_password"`
}

func (q *Queries) UpdatePassword(ctx context.Context, arg UpdatePasswordParams) (User, error) {
	row := q.db.QueryRow(ctx, updatePassword, arg.ID, arg.HashedPassword)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
	)
	return i, err
}

const updateUser = `-- name: UpdateUser :one
UPDATE users
SET username = $2, hashed_password = $3, email = $4, role_id = $5
WHERE id = $1
RETURNING id, username, hashed_password, email, role_id, created_at, updated_at, verification_id, bio, preferred_name, onboarding, onboarding_from, completed_tutorial, active_vault
`

type UpdateUserParams struct {
	ID             int32       `json:"id"`
	Username       string      `json:"username"`
	HashedPassword string      `json:"hashed_password"`
	Email          string      `json:"email"`
	RoleID         pgtype.Int4 `json:"role_id"`
}

func (q *Queries) UpdateUser(ctx context.Context, arg UpdateUserParams) (User, error) {
	row := q.db.QueryRow(ctx, updateUser,
		arg.ID,
		arg.Username,
		arg.HashedPassword,
		arg.Email,
		arg.RoleID,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
	)
	return i, err
}

const updateUserActiveVault = `-- name: UpdateUserActiveVault :exec
UPDATE users
SET active_vault = $2
WHERE id = $1
`

type UpdateUserActiveVaultParams struct {
	ID          int32       `json:"id"`
	ActiveVault pgtype.Int4 `json:"active_vault"`
}

func (q *Queries) UpdateUserActiveVault(ctx context.Context, arg UpdateUserActiveVaultParams) error {
	_, err := q.db.Exec(ctx, updateUserActiveVault, arg.ID, arg.ActiveVault)
	return err
}

const updateUserProfile = `-- name: UpdateUserProfile :one
UPDATE users
SET 
    username = $2, 
    email = $3, 
    bio = $4, 
    preferred_name = $5
WHERE 
    id = $1
RETURNING id, username, hashed_password, email, role_id, created_at, updated_at, verification_id, bio, preferred_name, onboarding, onboarding_from, completed_tutorial, active_vault
`

type UpdateUserProfileParams struct {
	ID            int32       `json:"id"`
	Username      string      `json:"username"`
	Email         string      `json:"email"`
	Bio           pgtype.Text `json:"bio"`
	PreferredName pgtype.Text `json:"preferred_name"`
}

func (q *Queries) UpdateUserProfile(ctx context.Context, arg UpdateUserProfileParams) (User, error) {
	row := q.db.QueryRow(ctx, updateUserProfile,
		arg.ID,
		arg.Username,
		arg.Email,
		arg.Bio,
		arg.PreferredName,
	)
	var i User
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
	)
	return i, err
}

const updateVerification = `-- name: UpdateVerification :one
WITH updated_user AS (
    UPDATE users
    SET verification_id = $2
    WHERE users.id = $1  
    RETURNING id, username, hashed_password, email, role_id, created_at, updated_at, verification_id, bio, preferred_name, onboarding, onboarding_from, completed_tutorial, active_vault
)
SELECT 
    updated_user.id, updated_user.username, updated_user.hashed_password, updated_user.email, updated_user.role_id, updated_user.created_at, updated_user.updated_at, updated_user.verification_id, updated_user.bio, updated_user.preferred_name, updated_user.onboarding, updated_user.onboarding_from, updated_user.completed_tutorial, updated_user.active_vault,
    verifications.token,
    verifications.expires_at,
    verifications.created_at,
    verifications.updated_at,
    verifications.status,
    verifications.email AS verification_email
FROM 
    updated_user
LEFT JOIN 
    verifications
ON 
    updated_user.verification_id = verifications.id
`

type UpdateVerificationParams struct {
	ID             int32       `json:"id"`
	VerificationID pgtype.UUID `json:"verification_id"`
}

type UpdateVerificationRow struct {
	ID                int32              `json:"id"`
	Username          string             `json:"username"`
	HashedPassword    string             `json:"hashed_password"`
	Email             string             `json:"email"`
	RoleID            pgtype.Int4        `json:"role_id"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
	UpdatedAt         pgtype.Timestamptz `json:"updated_at"`
	VerificationID    pgtype.UUID        `json:"verification_id"`
	Bio               pgtype.Text        `json:"bio"`
	PreferredName     pgtype.Text        `json:"preferred_name"`
	Onboarding        bool               `json:"onboarding"`
	OnboardingFrom    pgtype.Text        `json:"onboarding_from"`
	CompletedTutorial bool               `json:"completed_tutorial"`
	ActiveVault       pgtype.Int4        `json:"active_vault"`
	Token             pgtype.Text        `json:"token"`
	ExpiresAt         pgtype.Timestamp   `json:"expires_at"`
	CreatedAt_2       pgtype.Timestamptz `json:"created_at_2"`
	UpdatedAt_2       pgtype.Timestamptz `json:"updated_at_2"`
	Status            pgtype.Text        `json:"status"`
	VerificationEmail pgtype.Text        `json:"verification_email"`
}

func (q *Queries) UpdateVerification(ctx context.Context, arg UpdateVerificationParams) (UpdateVerificationRow, error) {
	row := q.db.QueryRow(ctx, updateVerification, arg.ID, arg.VerificationID)
	var i UpdateVerificationRow
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.HashedPassword,
		&i.Email,
		&i.RoleID,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.VerificationID,
		&i.Bio,
		&i.PreferredName,
		&i.Onboarding,
		&i.OnboardingFrom,
		&i.CompletedTutorial,
		&i.ActiveVault,
		&i.Token,
		&i.ExpiresAt,
		&i.CreatedAt_2,
		&i.UpdatedAt_2,
		&i.Status,
		&i.VerificationEmail,
	)
	return i, err
}

const updateVerificationStatus = `-- name: UpdateVerificationStatus :one
UPDATE verifications
SET status = $2
WHERE id = $1
RETURNING id, user_id, email, token, expires_at, created_at, updated_at, status
`

type UpdateVerificationStatusParams struct {
	ID     pgtype.UUID `json:"id"`
	Status string      `json:"status"`
}

func (q *Queries) UpdateVerificationStatus(ctx context.Context, arg UpdateVerificationStatusParams) (Verification, error) {
	row := q.db.QueryRow(ctx, updateVerificationStatus, arg.ID, arg.Status)
	var i Verification
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Email,
		&i.Token,
		&i.ExpiresAt,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Status,
	)
	return i, err
}
