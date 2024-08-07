// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: notes.sql

package db

import (
	"context"

	"github.com/jackc/pgx/v5/pgtype"
)

const createNote = `-- name: CreateNote :one
INSERT INTO notes (title, user_id, content)
VALUES ($1, $2, $3)
RETURNING id, user_id, title, content, content_vector, created_at, updated_at, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT target_note_id FROM note_links WHERE source_note_id = notes.id)) AS linked_notes
`

type CreateNoteParams struct {
	Title   string `json:"title"`
	UserID  int32  `json:"user_id"`
	Content string `json:"content"`
}

type CreateNoteRow struct {
	ID            int32              `json:"id"`
	UserID        int32              `json:"user_id"`
	Title         string             `json:"title"`
	Content       string             `json:"content"`
	ContentVector interface{}        `json:"content_vector"`
	CreatedAt     pgtype.Timestamptz `json:"created_at"`
	UpdatedAt     pgtype.Timestamptz `json:"updated_at"`
	Tags          interface{}        `json:"tags"`
	LinkedNotes   interface{}        `json:"linked_notes"`
}

func (q *Queries) CreateNote(ctx context.Context, arg CreateNoteParams) (CreateNoteRow, error) {
	row := q.db.QueryRow(ctx, createNote, arg.Title, arg.UserID, arg.Content)
	var i CreateNoteRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Content,
		&i.ContentVector,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Tags,
		&i.LinkedNotes,
	)
	return i, err
}

const deleteNote = `-- name: DeleteNote :exec
DELETE FROM notes
WHERE id = $1
`

func (q *Queries) DeleteNote(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteNote, id)
	return err
}

const deleteNoteByTitle = `-- name: DeleteNoteByTitle :exec
DELETE FROM notes
WHERE title = $1 AND user_id = $2
`

type DeleteNoteByTitleParams struct {
	Title  string `json:"title"`
	UserID int32  `json:"user_id"`
}

func (q *Queries) DeleteNoteByTitle(ctx context.Context, arg DeleteNoteByTitleParams) error {
	_, err := q.db.Exec(ctx, deleteNoteByTitle, arg.Title, arg.UserID)
	return err
}

const getNote = `-- name: GetNote :one
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) FILTER (WHERE t.id IS NOT NULL) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) FILTER (WHERE ln.id IS NOT NULL) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.id = $1
GROUP BY
  n.id
`

type GetNoteRow struct {
	ID          int32              `json:"id"`
	Title       string             `json:"title"`
	UserID      int32              `json:"user_id"`
	Content     string             `json:"content"`
	CreatedAt   pgtype.Timestamptz `json:"created_at"`
	UpdatedAt   pgtype.Timestamptz `json:"updated_at"`
	Tags        interface{}        `json:"tags"`
	LinkedNotes interface{}        `json:"linked_notes"`
}

func (q *Queries) GetNote(ctx context.Context, id int32) (GetNoteRow, error) {
	row := q.db.QueryRow(ctx, getNote, id)
	var i GetNoteRow
	err := row.Scan(
		&i.ID,
		&i.Title,
		&i.UserID,
		&i.Content,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Tags,
		&i.LinkedNotes,
	)
	return i, err
}

const getNotesByUser = `-- name: GetNotesByUser :many
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.user_id = $1
GROUP BY
  n.id
`

type GetNotesByUserRow struct {
	ID          int32              `json:"id"`
	Title       string             `json:"title"`
	UserID      int32              `json:"user_id"`
	Content     string             `json:"content"`
	CreatedAt   pgtype.Timestamptz `json:"created_at"`
	UpdatedAt   pgtype.Timestamptz `json:"updated_at"`
	Tags        interface{}        `json:"tags"`
	LinkedNotes interface{}        `json:"linked_notes"`
}

func (q *Queries) GetNotesByUser(ctx context.Context, userID int32) ([]GetNotesByUserRow, error) {
	rows, err := q.db.Query(ctx, getNotesByUser, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GetNotesByUserRow
	for rows.Next() {
		var i GetNotesByUserRow
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.UserID,
			&i.Content,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Tags,
			&i.LinkedNotes,
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

const searchNotes = `-- name: SearchNotes :many
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) FILTER (WHERE t.id IS NOT NULL) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) FILTER (WHERE ln.id IS NOT NULL) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.title ILIKE '%' || $1 || '%'
GROUP BY
  n.id
`

type SearchNotesRow struct {
	ID          int32              `json:"id"`
	Title       string             `json:"title"`
	UserID      int32              `json:"user_id"`
	Content     string             `json:"content"`
	CreatedAt   pgtype.Timestamptz `json:"created_at"`
	UpdatedAt   pgtype.Timestamptz `json:"updated_at"`
	Tags        interface{}        `json:"tags"`
	LinkedNotes interface{}        `json:"linked_notes"`
}

func (q *Queries) SearchNotes(ctx context.Context, dollar_1 pgtype.Text) ([]SearchNotesRow, error) {
	rows, err := q.db.Query(ctx, searchNotes, dollar_1)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []SearchNotesRow
	for rows.Next() {
		var i SearchNotesRow
		if err := rows.Scan(
			&i.ID,
			&i.Title,
			&i.UserID,
			&i.Content,
			&i.CreatedAt,
			&i.UpdatedAt,
			&i.Tags,
			&i.LinkedNotes,
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

const updateNote = `-- name: UpdateNote :one
UPDATE notes
SET title = $2, content = $3, updated_at = CURRENT_TIMESTAMP
WHERE notes.id = $1
RETURNING id, user_id, title, content, content_vector, created_at, updated_at, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT linked_note_id FROM note_links WHERE note_id = notes.id)) AS linked_notes
`

type UpdateNoteParams struct {
	ID      int32  `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type UpdateNoteRow struct {
	ID            int32              `json:"id"`
	UserID        int32              `json:"user_id"`
	Title         string             `json:"title"`
	Content       string             `json:"content"`
	ContentVector interface{}        `json:"content_vector"`
	CreatedAt     pgtype.Timestamptz `json:"created_at"`
	UpdatedAt     pgtype.Timestamptz `json:"updated_at"`
	Tags          interface{}        `json:"tags"`
	LinkedNotes   interface{}        `json:"linked_notes"`
}

func (q *Queries) UpdateNote(ctx context.Context, arg UpdateNoteParams) (UpdateNoteRow, error) {
	row := q.db.QueryRow(ctx, updateNote, arg.ID, arg.Title, arg.Content)
	var i UpdateNoteRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Content,
		&i.ContentVector,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Tags,
		&i.LinkedNotes,
	)
	return i, err
}

const updateNoteByTitle = `-- name: UpdateNoteByTitle :one
UPDATE notes
SET title = $3, content = $4, updated_at = CURRENT_TIMESTAMP
WHERE title = $1 AND user_id = $2
RETURNING id, user_id, title, content, content_vector, created_at, updated_at, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT target_note_id FROM note_links WHERE source_note_id = notes.id)) AS linked_notes
`

type UpdateNoteByTitleParams struct {
	Title   string `json:"title"`
	UserID  int32  `json:"user_id"`
	Title_2 string `json:"title_2"`
	Content string `json:"content"`
}

type UpdateNoteByTitleRow struct {
	ID            int32              `json:"id"`
	UserID        int32              `json:"user_id"`
	Title         string             `json:"title"`
	Content       string             `json:"content"`
	ContentVector interface{}        `json:"content_vector"`
	CreatedAt     pgtype.Timestamptz `json:"created_at"`
	UpdatedAt     pgtype.Timestamptz `json:"updated_at"`
	Tags          interface{}        `json:"tags"`
	LinkedNotes   interface{}        `json:"linked_notes"`
}

func (q *Queries) UpdateNoteByTitle(ctx context.Context, arg UpdateNoteByTitleParams) (UpdateNoteByTitleRow, error) {
	row := q.db.QueryRow(ctx, updateNoteByTitle,
		arg.Title,
		arg.UserID,
		arg.Title_2,
		arg.Content,
	)
	var i UpdateNoteByTitleRow
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.Title,
		&i.Content,
		&i.ContentVector,
		&i.CreatedAt,
		&i.UpdatedAt,
		&i.Tags,
		&i.LinkedNotes,
	)
	return i, err
}
