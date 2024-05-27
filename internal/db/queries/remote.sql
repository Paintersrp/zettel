-- remote_changes table queries

-- name: CreateRemoteChange :one
INSERT INTO remote_changes (user_id, note_id, action, title, content)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetUnprocessedRemoteChanges :many
SELECT * FROM remote_changes
WHERE user_id = $1 AND processed = false
ORDER BY created_at;

-- name: MarkRemoteChangeProcessed :exec
UPDATE remote_changes
SET processed = true
WHERE id = $1;

-- remote_tag_changes table queries

-- name: CreateRemoteTagChange :one
INSERT INTO remote_tag_changes (user_id, note_id, tag_id, action)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUnprocessedRemoteTagChanges :many
SELECT * FROM remote_tag_changes
WHERE user_id = $1 AND processed = false
ORDER BY created_at;

-- name: MarkRemoteTagChangeProcessed :exec
UPDATE remote_tag_changes
SET processed = true
WHERE id = $1;

-- remote_link_changes table queries

-- name: CreateRemoteLinkChange :one
INSERT INTO remote_link_changes (user_id, note_id, linked_note_id, action)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUnprocessedRemoteLinkChanges :many
SELECT * FROM remote_link_changes
WHERE user_id = $1 AND processed = false
ORDER BY created_at;

-- name: MarkRemoteLinkChangeProcessed :exec
UPDATE remote_link_changes
SET processed = true
WHERE id = $1;
