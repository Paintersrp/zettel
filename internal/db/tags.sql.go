// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: tags.sql

package db

import (
	"context"
)

const addTagToNote = `-- name: AddTagToNote :exec
INSERT INTO note_tags (note_id, tag_id)
VALUES ($1, $2)
`

type AddTagToNoteParams struct {
	NoteID int32 `json:"note_id"`
	TagID  int32 `json:"tag_id"`
}

func (q *Queries) AddTagToNote(ctx context.Context, arg AddTagToNoteParams) error {
	_, err := q.db.Exec(ctx, addTagToNote, arg.NoteID, arg.TagID)
	return err
}

const createTag = `-- name: CreateTag :one
INSERT INTO tags (name)
VALUES ($1)
RETURNING id, name
`

func (q *Queries) CreateTag(ctx context.Context, name string) (Tag, error) {
	row := q.db.QueryRow(ctx, createTag, name)
	var i Tag
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}

const deleteTag = `-- name: DeleteTag :exec
DELETE FROM tags
WHERE id = $1
`

func (q *Queries) DeleteTag(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deleteTag, id)
	return err
}

const findOrCreateTag = `-- name: FindOrCreateTag :one
WITH ins AS (
    INSERT INTO tags (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING id, name
)
SELECT id, name FROM ins
UNION
SELECT id, name FROM tags WHERE name = $1
`

type FindOrCreateTagRow struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
}

func (q *Queries) FindOrCreateTag(ctx context.Context, name string) (FindOrCreateTagRow, error) {
	row := q.db.QueryRow(ctx, findOrCreateTag, name)
	var i FindOrCreateTagRow
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}

const getNoteTagByNoteAndTag = `-- name: GetNoteTagByNoteAndTag :one
SELECT note_id, tag_id
FROM note_tags
WHERE note_id = $1 AND tag_id = $2
`

type GetNoteTagByNoteAndTagParams struct {
	NoteID int32 `json:"note_id"`
	TagID  int32 `json:"tag_id"`
}

func (q *Queries) GetNoteTagByNoteAndTag(ctx context.Context, arg GetNoteTagByNoteAndTagParams) (NoteTag, error) {
	row := q.db.QueryRow(ctx, getNoteTagByNoteAndTag, arg.NoteID, arg.TagID)
	var i NoteTag
	err := row.Scan(&i.NoteID, &i.TagID)
	return i, err
}

const getNoteTags = `-- name: GetNoteTags :many
SELECT note_id, tag_id 
FROM note_tags
`

func (q *Queries) GetNoteTags(ctx context.Context) ([]NoteTag, error) {
	rows, err := q.db.Query(ctx, getNoteTags)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []NoteTag
	for rows.Next() {
		var i NoteTag
		if err := rows.Scan(&i.NoteID, &i.TagID); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getTag = `-- name: GetTag :one
SELECT id, name 
FROM tags 
WHERE id = $1
`

func (q *Queries) GetTag(ctx context.Context, id int32) (Tag, error) {
	row := q.db.QueryRow(ctx, getTag, id)
	var i Tag
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}

const getTags = `-- name: GetTags :many
SELECT id, name 
FROM tags
`

func (q *Queries) GetTags(ctx context.Context) ([]Tag, error) {
	rows, err := q.db.Query(ctx, getTags)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Tag
	for rows.Next() {
		var i Tag
		if err := rows.Scan(&i.ID, &i.Name); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const getTagsByNote = `-- name: GetTagsByNote :many
SELECT t.id, t.name 
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.note_id = $1
`

func (q *Queries) GetTagsByNote(ctx context.Context, noteID int32) ([]Tag, error) {
	rows, err := q.db.Query(ctx, getTagsByNote, noteID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Tag
	for rows.Next() {
		var i Tag
		if err := rows.Scan(&i.ID, &i.Name); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const removeTagFromNote = `-- name: RemoveTagFromNote :exec
DELETE FROM note_tags
WHERE note_id = $1 AND tag_id = $2
`

type RemoveTagFromNoteParams struct {
	NoteID int32 `json:"note_id"`
	TagID  int32 `json:"tag_id"`
}

func (q *Queries) RemoveTagFromNote(ctx context.Context, arg RemoveTagFromNoteParams) error {
	_, err := q.db.Exec(ctx, removeTagFromNote, arg.NoteID, arg.TagID)
	return err
}

const updateTag = `-- name: UpdateTag :one
UPDATE tags
SET name = $2
WHERE id = $1
RETURNING id, name
`

type UpdateTagParams struct {
	ID   int32  `json:"id"`
	Name string `json:"name"`
}

func (q *Queries) UpdateTag(ctx context.Context, arg UpdateTagParams) (Tag, error) {
	row := q.db.QueryRow(ctx, updateTag, arg.ID, arg.Name)
	var i Tag
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}
