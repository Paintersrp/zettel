// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: trails.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const addCollaboratorToTrail = `-- name: AddCollaboratorToTrail :one
INSERT INTO collaborators (user_id, resource_type, resource_id, role)
VALUES ($1, 'trail', $2, $3)
RETURNING id, user_id, resource_type, resource_id, role, invited_at, accepted_at
`

type AddCollaboratorToTrailParams struct {
	UserID     int32            `json:"user_id"`
	ResourceID int32            `json:"resource_id"`
	Role       CollaboratorRole `json:"role"`
}

func (q *Queries) AddCollaboratorToTrail(ctx context.Context, arg AddCollaboratorToTrailParams) (Collaborator, error) {
	row := q.db.QueryRow(ctx, addCollaboratorToTrail, arg.UserID, arg.ResourceID, arg.Role)
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

const addNoteToTrail = `-- name: AddNoteToTrail :exec
INSERT INTO trail_notes (trail_id, note_id, position)
VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM trail_notes WHERE trail_id = $1))
`

type AddNoteToTrailParams struct {
	TrailID int32 `json:"trail_id"`
	NoteID  int32 `json:"note_id"`
}

func (q *Queries) AddNoteToTrail(ctx context.Context, arg AddNoteToTrailParams) error {
	_, err := q.db.Exec(ctx, addNoteToTrail, arg.TrailID, arg.NoteID)
	return err
}

const createTrail = `-- name: CreateTrail :one
INSERT INTO trails (user_id, title, description, visibility)
VALUES ($1, $2, $3, $4)
RETURNING id, user_id, title, description, visibility, created_at, updated_at
`

type CreateTrailParams struct {
	UserID      int32          `json:"user_id"`
	Title       string         `json:"title"`
	Description pgtype.Text    `json:"description"`
	Visibility  VisibilityType `json:"visibility"`
}

func (q *Queries) CreateTrail(ctx context.Context, arg CreateTrailParams) (Trail, error) {
	row := q.db.QueryRow(ctx, createTrail,
		arg.UserID,
		arg.Title,
		arg.Description,
		arg.Visibility,
	)
	var i Trail
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Description,
		&i.Visibility,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}

const deleteTrail = `-- name: DeleteTrail :exec
DELETE FROM trails
WHERE id = $1
`

func (q *Queries) DeleteTrail(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteTrail, id)
	return err
}

const getMostRecentTrailActivity = `-- name: GetMostRecentTrailActivity :many
SELECT t.id, t.title, t.updated_at, 
       CASE 
           WHEN t.updated_at > COALESCE(MAX(n.updated_at), '0001-01-01'::timestamptz) THEN 'trail'
           ELSE 'note'
       END AS last_updated_type
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN notes n ON tn.note_id = n.id
WHERE t.user_id = $1
GROUP BY t.id, t.title, t.updated_at
ORDER BY GREATEST(t.updated_at, COALESCE(MAX(n.updated_at), '0001-01-01'::timestamptz)) DESC
LIMIT $2
`

type GetMostRecentTrailActivityParams struct {
	UserID int32 `json:"user_id"`
	Limit  int32 `json:"limit"`
}

type GetMostRecentTrailActivityRow struct {
	ID              int32              `json:"id"`
	Title           string             `json:"title"`
	UpdatedAt       pgtype.Timestamptz `json:"updated_at"`
	LastUpdatedType string             `json:"last_updated_type"`
}

func (q *Queries) GetMostRecentTrailActivity(ctx context.Context, arg GetMostRecentTrailActivityParams) ([]GetMostRecentTrailActivityRow, error) {
	rows, err := q.db.Query(ctx, getMostRecentTrailActivity, arg.UserID, arg.Limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetMostRecentTrailActivityRow
	for rows.Next() {
		var i GetMostRecentTrailActivityRow
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.UpdatedAt,
			&i.LastUpdatedType,
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

const getTrail = `-- name: GetTrail :one
SELECT t.id, t.user_id, t.title, t.description, t.visibility, t.created_at, t.updated_at,
       json_agg(DISTINCT jsonb_build_object(
           'id', n.id,
           'title', n.title,
           'position', tn.position
       ) ORDER BY tn.position) AS notes,
       json_agg(DISTINCT jsonb_build_object(
           'user_id', c.user_id,
           'username', u.username,
           'email', u.email,
           'role', c.role
       )) FILTER (WHERE c.user_id IS NOT NULL) AS collaborators
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN notes n ON tn.note_id = n.id
LEFT JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
LEFT JOIN users u ON c.user_id = u.id
WHERE t.id = $1
GROUP BY t.id
`

type GetTrailRow struct {
	ID            int32              `json:"id"`
	UserID        int32              `json:"user_id"`
	Title         string             `json:"title"`
	Description   pgtype.Text        `json:"description"`
	Visibility    VisibilityType     `json:"visibility"`
	CreatedAt     pgtype.Timestamptz `json:"created_at"`
	UpdatedAt     pgtype.Timestamptz `json:"updated_at"`
	Notes         []byte             `json:"notes"`
	Collaborators []byte             `json:"collaborators"`
}

func (q *Queries) GetTrail(ctx context.Context, id int32) (GetTrailRow, error) {
	row := q.db.QueryRow(ctx, getTrail, id)
	var i GetTrailRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Description,
		&i.Visibility,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Notes,
		&i.Collaborators,
	)
	return i, err
}

const getTrailCollaborators = `-- name: GetTrailCollaborators :many
SELECT u.id, u.username, u.email, c.role
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = 'trail' AND c.resource_id = $1
ORDER BY c.role, u.username
`

type GetTrailCollaboratorsRow struct {
	ID       int32            `json:"id"`
	Username string           `json:"username"`
	Email    string           `json:"email"`
	Role     CollaboratorRole `json:"role"`
}

func (q *Queries) GetTrailCollaborators(ctx context.Context, resourceID int32) ([]GetTrailCollaboratorsRow, error) {
	rows, err := q.db.Query(ctx, getTrailCollaborators, resourceID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetTrailCollaboratorsRow
	for rows.Next() {
		var i GetTrailCollaboratorsRow
		if err := rows.Scan(
			&i.ID,
			&i.Username,
			&i.Email,
			&i.Role,
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

const getTrailNotes = `-- name: GetTrailNotes :many
SELECT n.id, n.user_id, n.title, n.content, n.content_vector, n.created_at, n.updated_at, tn.position
FROM notes n
JOIN trail_notes tn ON n.id = tn.note_id
WHERE tn.trail_id = $1
ORDER BY tn.position
`

type GetTrailNotesRow struct {
	ID            int32              `json:"id"`
	UserID        int32              `json:"user_id"`
	Title         string             `json:"title"`
	Content       string             `json:"content"`
	ContentVector interface{}        `json:"content_vector"`
	CreatedAt     pgtype.Timestamptz `json:"created_at"`
	UpdatedAt     pgtype.Timestamptz `json:"updated_at"`
	Position      int32              `json:"position"`
}

func (q *Queries) GetTrailNotes(ctx context.Context, trailID int32) ([]GetTrailNotesRow, error) {
	rows, err := q.db.Query(ctx, getTrailNotes, trailID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetTrailNotesRow
	for rows.Next() {
		var i GetTrailNotesRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.Content,
			&i.ContentVector,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Position,
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

const getTrailStats = `-- name: GetTrailStats :one
SELECT 
    COUNT(DISTINCT t.id) AS total_trails,
    COUNT(DISTINCT tn.note_id) AS total_notes,
    AVG(note_count) AS avg_notes_per_trail
FROM trails t
LEFT JOIN (
    SELECT trail_id, COUNT(*) AS note_count
    FROM trail_notes
    GROUP BY trail_id
) tn ON t.id = tn.trail_id
WHERE t.user_id = $1
`

type GetTrailStatsRow struct {
	TotalTrails      int64   `json:"total_trails"`
	TotalNotes       int64   `json:"total_notes"`
	AvgNotesPerTrail float64 `json:"avg_notes_per_trail"`
}

func (q *Queries) GetTrailStats(ctx context.Context, userID int32) (GetTrailStatsRow, error) {
	row := q.db.QueryRow(ctx, getTrailStats, userID)
	var i GetTrailStatsRow
	err := row.Scan(&i.TotalTrails, &i.TotalNotes, &i.AvgNotesPerTrail)
	return i, err
}

const getTrailsForNote = `-- name: GetTrailsForNote :many
SELECT t.id, t.user_id, t.title, t.description, t.visibility, t.created_at, t.updated_at
FROM trails t
JOIN trail_notes tn ON t.id = tn.trail_id
WHERE tn.note_id = $1
ORDER BY t.updated_at DESC
`

func (q *Queries) GetTrailsForNote(ctx context.Context, noteID int32) ([]Trail, error) {
	rows, err := q.db.Query(ctx, getTrailsForNote, noteID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Trail
	for rows.Next() {
		var i Trail
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.Description,
			&i.Visibility,
			&i.CreatedAt,
			&i.UpdatedAt,
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

const listCollaborativeTrails = `-- name: ListCollaborativeTrails :many
SELECT t.id, t.user_id, t.title, t.description, t.visibility, t.created_at, t.updated_at,
       COUNT(DISTINCT tn.note_id) AS note_count,
       c.role AS user_role
FROM trails t
JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
WHERE c.user_id = $1
GROUP BY t.id, c.role
ORDER BY t.updated_at DESC
LIMIT $2 OFFSET $3
`

type ListCollaborativeTrailsParams struct {
	UserID int32 `json:"user_id"`
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

type ListCollaborativeTrailsRow struct {
	ID          int32              `json:"id"`
	UserID      int32              `json:"user_id"`
	Title       string             `json:"title"`
	Description pgtype.Text        `json:"description"`
	Visibility  VisibilityType     `json:"visibility"`
	CreatedAt   pgtype.Timestamptz `json:"created_at"`
	UpdatedAt   pgtype.Timestamptz `json:"updated_at"`
	NoteCount   int64              `json:"note_count"`
	UserRole    CollaboratorRole   `json:"user_role"`
}

func (q *Queries) ListCollaborativeTrails(ctx context.Context, arg ListCollaborativeTrailsParams) ([]ListCollaborativeTrailsRow, error) {
	rows, err := q.db.Query(ctx, listCollaborativeTrails, arg.UserID, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListCollaborativeTrailsRow
	for rows.Next() {
		var i ListCollaborativeTrailsRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.Description,
			&i.Visibility,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.NoteCount,
			&i.UserRole,
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

const listTrailsByUser = `-- name: ListTrailsByUser :many
SELECT t.id, t.user_id, t.title, t.description, t.visibility, t.created_at, t.updated_at,
       COUNT(DISTINCT tn.note_id) AS note_count,
       COUNT(DISTINCT c.user_id) AS collaborator_count
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
WHERE t.user_id = $1
GROUP BY t.id
ORDER BY t.updated_at DESC
LIMIT $2 OFFSET $3
`

type ListTrailsByUserParams struct {
	UserID int32 `json:"user_id"`
	Limit  int32 `json:"limit"`
	Offset int32 `json:"offset"`
}

type ListTrailsByUserRow struct {
	ID                int32              `json:"id"`
	UserID            int32              `json:"user_id"`
	Title             string             `json:"title"`
	Description       pgtype.Text        `json:"description"`
	Visibility        VisibilityType     `json:"visibility"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
	UpdatedAt         pgtype.Timestamptz `json:"updated_at"`
	NoteCount         int64              `json:"note_count"`
	CollaboratorCount int64              `json:"collaborator_count"`
}

func (q *Queries) ListTrailsByUser(ctx context.Context, arg ListTrailsByUserParams) ([]ListTrailsByUserRow, error) {
	rows, err := q.db.Query(ctx, listTrailsByUser, arg.UserID, arg.Limit, arg.Offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []ListTrailsByUserRow
	for rows.Next() {
		var i ListTrailsByUserRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.Description,
			&i.Visibility,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.NoteCount,
			&i.CollaboratorCount,
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

const removeCollaboratorFromTrail = `-- name: RemoveCollaboratorFromTrail :exec
DELETE FROM collaborators
WHERE user_id = $1 AND resource_type = 'trail' AND resource_id = $2
`

type RemoveCollaboratorFromTrailParams struct {
	UserID     int32 `json:"user_id"`
	ResourceID int32 `json:"resource_id"`
}

func (q *Queries) RemoveCollaboratorFromTrail(ctx context.Context, arg RemoveCollaboratorFromTrailParams) error {
	_, err := q.db.Exec(ctx, removeCollaboratorFromTrail, arg.UserID, arg.ResourceID)
	return err
}

const removeNoteFromTrail = `-- name: RemoveNoteFromTrail :exec
DELETE FROM trail_notes
WHERE trail_id = $1 AND note_id = $2
`

type RemoveNoteFromTrailParams struct {
	TrailID int32 `json:"trail_id"`
	NoteID  int32 `json:"note_id"`
}

func (q *Queries) RemoveNoteFromTrail(ctx context.Context, arg RemoveNoteFromTrailParams) error {
	_, err := q.db.Exec(ctx, removeNoteFromTrail, arg.TrailID, arg.NoteID)
	return err
}

const searchTrails = `-- name: SearchTrails :many
SELECT t.id, t.user_id, t.title, t.description, t.visibility, t.created_at, t.updated_at,
       COUNT(DISTINCT tn.note_id) AS note_count,
       COUNT(DISTINCT c.user_id) AS collaborator_count
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
WHERE t.user_id = $1 AND (t.title ILIKE '%' || $2 || '%' OR t.description ILIKE '%' || $2 || '%')
GROUP BY t.id
ORDER BY t.updated_at DESC
LIMIT $3 OFFSET $4
`

type SearchTrailsParams struct {
	UserID  int32       `json:"user_id"`
	Column2 pgtype.Text `json:"column_2"`
	Limit   int32       `json:"limit"`
	Offset  int32       `json:"offset"`
}

type SearchTrailsRow struct {
	ID                int32              `json:"id"`
	UserID            int32              `json:"user_id"`
	Title             string             `json:"title"`
	Description       pgtype.Text        `json:"description"`
	Visibility        VisibilityType     `json:"visibility"`
	CreatedAt         pgtype.Timestamptz `json:"created_at"`
	UpdatedAt         pgtype.Timestamptz `json:"updated_at"`
	NoteCount         int64              `json:"note_count"`
	CollaboratorCount int64              `json:"collaborator_count"`
}

func (q *Queries) SearchTrails(ctx context.Context, arg SearchTrailsParams) ([]SearchTrailsRow, error) {
	rows, err := q.db.Query(ctx, searchTrails,
		arg.UserID,
		arg.Column2,
		arg.Limit,
		arg.Offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SearchTrailsRow
	for rows.Next() {
		var i SearchTrailsRow
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.Title,
			&i.Description,
			&i.Visibility,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.NoteCount,
			&i.CollaboratorCount,
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

const updateNotePosition = `-- name: UpdateNotePosition :exec
UPDATE trail_notes
SET position = $3
WHERE trail_id = $1 AND note_id = $2
`

type UpdateNotePositionParams struct {
	TrailID  int32 `json:"trail_id"`
	NoteID   int32 `json:"note_id"`
	Position int32 `json:"position"`
}

func (q *Queries) UpdateNotePosition(ctx context.Context, arg UpdateNotePositionParams) error {
	_, err := q.db.Exec(ctx, updateNotePosition, arg.TrailID, arg.NoteID, arg.Position)
	return err
}

const updateTrail = `-- name: UpdateTrail :one
UPDATE trails
SET title = $2, description = $3, visibility = $4, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING id, user_id, title, description, visibility, created_at, updated_at
`

type UpdateTrailParams struct {
	ID          int32          `json:"id"`
	Title       string         `json:"title"`
	Description pgtype.Text    `json:"description"`
	Visibility  VisibilityType `json:"visibility"`
}

func (q *Queries) UpdateTrail(ctx context.Context, arg UpdateTrailParams) (Trail, error) {
	row := q.db.QueryRow(ctx, updateTrail,
		arg.ID,
		arg.Title,
		arg.Description,
		arg.Visibility,
	)
	var i Trail
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Description,
		&i.Visibility,
		&i.CreatedAt,
		&i.UpdatedAt,
	)
	return i, err
}
