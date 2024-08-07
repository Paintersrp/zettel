// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: collaborators.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const acceptCollaborationInvite = `-- name: AcceptCollaborationInvite :one
UPDATE collaborators
SET accepted_at = CURRENT_TIMESTAMP
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3 AND accepted_at IS NULL
RETURNING id, user_id, resource_type, resource_id, role, invited_at, accepted_at
`

type AcceptCollaborationInviteParams struct {
	UserID       int32       `json:"user_id"`
	ResourceType ContentType `json:"resource_type"`
	ResourceID   int32       `json:"resource_id"`
}

func (q *Queries) AcceptCollaborationInvite(ctx context.Context, arg AcceptCollaborationInviteParams) (Collaborator, error) {
	row := q.db.QueryRow(ctx, acceptCollaborationInvite, arg.UserID, arg.ResourceType, arg.ResourceID)
	var i Collaborator
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ResourceType,
		&i.ResourceID,
		&i.Role,
		&i.InvitedAt,
		&i.AcceptedAt,
	)
	return i, err
}

const addCollaborator = `-- name: AddCollaborator :one
INSERT INTO collaborators (user_id, resource_type, resource_id, role)
VALUES ($1, $2, $3, $4)
RETURNING id, user_id, resource_type, resource_id, role, invited_at, accepted_at
`

type AddCollaboratorParams struct {
	UserID       int32            `json:"user_id"`
	ResourceType ContentType      `json:"resource_type"`
	ResourceID   int32            `json:"resource_id"`
	Role         CollaboratorRole `json:"role"`
}

func (q *Queries) AddCollaborator(ctx context.Context, arg AddCollaboratorParams) (Collaborator, error) {
	row := q.db.QueryRow(ctx, addCollaborator,
		arg.UserID,
		arg.ResourceType,
		arg.ResourceID,
		arg.Role,
	)
	var i Collaborator
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ResourceType,
		&i.ResourceID,
		&i.Role,
		&i.InvitedAt,
		&i.AcceptedAt,
	)
	return i, err
}

const getCollaborator = `-- name: GetCollaborator :one
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.user_id = $1 AND c.resource_type = $2 AND c.resource_id = $3
`

type GetCollaboratorParams struct {
	UserID       int32       `json:"user_id"`
	ResourceType ContentType `json:"resource_type"`
	ResourceID   int32       `json:"resource_id"`
}

type GetCollaboratorRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
}

func (q *Queries) GetCollaborator(ctx context.Context, arg GetCollaboratorParams) (GetCollaboratorRow, error) {
	row := q.db.QueryRow(ctx, getCollaborator, arg.UserID, arg.ResourceType, arg.ResourceID)
	var i GetCollaboratorRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ResourceType,
		&i.ResourceID,
		&i.Role,
		&i.InvitedAt,
		&i.AcceptedAt,
		&i.Username,
		&i.Email,
	)
	return i, err
}

const getCollaboratorsByRole = `-- name: GetCollaboratorsByRole :many
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2 AND c.role = $3
ORDER BY u.username
`

type GetCollaboratorsByRoleParams struct {
	ResourceType ContentType      `json:"resource_type"`
	ResourceID   int32            `json:"resource_id"`
	Role         CollaboratorRole `json:"role"`
}

type GetCollaboratorsByRoleRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
}

func (q *Queries) GetCollaboratorsByRole(ctx context.Context, arg GetCollaboratorsByRoleParams) ([]GetCollaboratorsByRoleRow, error) {
	rows, err := q.db.Query(ctx, getCollaboratorsByRole, arg.ResourceType, arg.ResourceID, arg.Role)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetCollaboratorsByRoleRow
	for rows.Next() {
		var i GetCollaboratorsByRoleRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.Username,
			&i.Email,
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

const getPendingCollaborationInvites = `-- name: GetPendingCollaborationInvites :many
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, 
       u.username, 
       u.email,
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
JOIN users u ON c.user_id = u.id
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE c.user_id = $1 AND c.accepted_at IS NULL
ORDER BY c.invited_at DESC
`

type GetPendingCollaborationInvitesRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
	ResourceName interface{}        `json:"resource_name"`
}

func (q *Queries) GetPendingCollaborationInvites(ctx context.Context, userID int32) ([]GetPendingCollaborationInvitesRow, error) {
	rows, err := q.db.Query(ctx, getPendingCollaborationInvites, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetPendingCollaborationInvitesRow
	for rows.Next() {
		var i GetPendingCollaborationInvitesRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.Username,
			&i.Email,
			&i.ResourceName,
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

const getRecentCollaborations = `-- name: GetRecentCollaborations :many

SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, 
       u.username, 
       u.email,
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
JOIN users u ON c.user_id = u.id
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE (c.resource_type = 'hub' AND h.user_id = $1) 
   OR (c.resource_type = 'trail' AND t.user_id = $1)
ORDER BY c.invited_at DESC
LIMIT $2
`

type GetRecentCollaborationsParams struct {
	UserID int32 `json:"user_id"`
	Limit  int32 `json:"limit"`
}

type GetRecentCollaborationsRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
	ResourceName interface{}        `json:"resource_name"`
}

// TODO: GetCollaborationStats :one
func (q *Queries) GetRecentCollaborations(ctx context.Context, arg GetRecentCollaborationsParams) ([]GetRecentCollaborationsRow, error) {
	rows, err := q.db.Query(ctx, getRecentCollaborations, arg.UserID, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetRecentCollaborationsRow
	for rows.Next() {
		var i GetRecentCollaborationsRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.Username,
			&i.Email,
			&i.ResourceName,
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

const listCollaborationsForUser = `-- name: ListCollaborationsForUser :many
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, 
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE c.user_id = $1
ORDER BY c.resource_type, c.invited_at DESC
`

type ListCollaborationsForUserRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	ResourceName interface{}        `json:"resource_name"`
}

func (q *Queries) ListCollaborationsForUser(ctx context.Context, userID int32) ([]ListCollaborationsForUserRow, error) {
	rows, err := q.db.Query(ctx, listCollaborationsForUser, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListCollaborationsForUserRow
	for rows.Next() {
		var i ListCollaborationsForUserRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.ResourceName,
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

const listCollaboratorsForResource = `-- name: ListCollaboratorsForResource :many
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2
ORDER BY c.role, u.username
`

type ListCollaboratorsForResourceParams struct {
	ResourceType ContentType `json:"resource_type"`
	ResourceID   int32       `json:"resource_id"`
}

type ListCollaboratorsForResourceRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
}

func (q *Queries) ListCollaboratorsForResource(ctx context.Context, arg ListCollaboratorsForResourceParams) ([]ListCollaboratorsForResourceRow, error) {
	rows, err := q.db.Query(ctx, listCollaboratorsForResource, arg.ResourceType, arg.ResourceID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListCollaboratorsForResourceRow
	for rows.Next() {
		var i ListCollaboratorsForResourceRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.Username,
			&i.Email,
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

const removeCollaborator = `-- name: RemoveCollaborator :exec
DELETE FROM collaborators
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3
`

type RemoveCollaboratorParams struct {
	UserID       int32       `json:"user_id"`
	ResourceType ContentType `json:"resource_type"`
	ResourceID   int32       `json:"resource_id"`
}

func (q *Queries) RemoveCollaborator(ctx context.Context, arg RemoveCollaboratorParams) error {
	_, err := q.db.Exec(ctx, removeCollaborator, arg.UserID, arg.ResourceType, arg.ResourceID)
	return err
}

const searchCollaborators = `-- name: SearchCollaborators :many
SELECT c.id, c.user_id, c.resource_type, c.resource_id, c.role, c.invited_at, c.accepted_at, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2
  AND (u.username ILIKE '%' || $3 || '%' OR u.email ILIKE '%' || $3 || '%')
ORDER BY u.username
`

type SearchCollaboratorsParams struct {
	ResourceType ContentType `json:"resource_type"`
	ResourceID   int32       `json:"resource_id"`
	Column3      pgtype.Text `json:"column_3"`
}

type SearchCollaboratorsRow struct {
	ID           int32              `json:"id"`
	UserID       int32              `json:"user_id"`
	ResourceType ContentType        `json:"resource_type"`
	ResourceID   int32              `json:"resource_id"`
	Role         CollaboratorRole   `json:"role"`
	InvitedAt    pgtype.Timestamptz `json:"invited_at"`
	AcceptedAt   pgtype.Timestamptz `json:"accepted_at"`
	Username     string             `json:"username"`
	Email        string             `json:"email"`
}

func (q *Queries) SearchCollaborators(ctx context.Context, arg SearchCollaboratorsParams) ([]SearchCollaboratorsRow, error) {
	rows, err := q.db.Query(ctx, searchCollaborators, arg.ResourceType, arg.ResourceID, arg.Column3)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SearchCollaboratorsRow
	for rows.Next() {
		var i SearchCollaboratorsRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.ResourceType,
			&i.ResourceID,
			&i.Role,
			&i.InvitedAt,
			&i.AcceptedAt,
			&i.Username,
			&i.Email,
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

const updateCollaboratorRole = `-- name: UpdateCollaboratorRole :one
UPDATE collaborators
SET role = $4
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3
RETURNING id, user_id, resource_type, resource_id, role, invited_at, accepted_at
`

type UpdateCollaboratorRoleParams struct {
	UserID       int32            `json:"user_id"`
	ResourceType ContentType      `json:"resource_type"`
	ResourceID   int32            `json:"resource_id"`
	Role         CollaboratorRole `json:"role"`
}

func (q *Queries) UpdateCollaboratorRole(ctx context.Context, arg UpdateCollaboratorRoleParams) (Collaborator, error) {
	row := q.db.QueryRow(ctx, updateCollaboratorRole,
		arg.UserID,
		arg.ResourceType,
		arg.ResourceID,
		arg.Role,
	)
	var i Collaborator
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.ResourceType,
		&i.ResourceID,
		&i.Role,
		&i.InvitedAt,
		&i.AcceptedAt,
	)
	return i, err
}
