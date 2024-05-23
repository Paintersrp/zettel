-- name: CreateTag :one
INSERT INTO tags (name)
VALUES ($1)
RETURNING *;

-- name: GetTag :one
SELECT * 
FROM tags 
WHERE id = $1;

-- name: GetTags :many
SELECT * 
FROM tags;

-- name: UpdateTag :one
UPDATE tags
SET name = $2
WHERE id = $1
RETURNING *;

-- name: DeleteTag :exec
DELETE FROM tags
WHERE id = $1;

-- name: AddTagToNote :exec
INSERT INTO note_tags (note_id, tag_id)
VALUES ($1, $2);

-- name: RemoveTagFromNote :exec
DELETE FROM note_tags
WHERE note_id = $1 AND tag_id = $2;

-- name: GetTagsByNote :many
SELECT t.* 
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.note_id = $1;

-- name: FindOrCreateTag :one
WITH ins AS (
    INSERT INTO tags (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING *
)
SELECT * FROM ins
UNION
SELECT * FROM tags WHERE name = $1;

-- name: GetNoteTags :many
SELECT * 
FROM note_tags;

-- name: GetNoteTagByNoteAndTag :one
SELECT *
FROM note_tags
WHERE note_id = $1 AND tag_id = $2;
