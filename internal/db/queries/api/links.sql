-- name: FindOrCreateNoteLink :one
WITH ins AS (
    INSERT INTO note_links (source_note_id, target_note_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *
)
SELECT * FROM ins
UNION
SELECT * FROM note_links WHERE source_note_id = $1 AND target_note_id = $2;

-- name: CreateNoteLink :one
INSERT INTO note_links (source_note_id, target_note_id, description)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetNoteLink :one
SELECT * FROM note_links
WHERE id = $1;

-- name: UpdateNoteLink :one
UPDATE note_links
SET description = $2, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteNoteLink :exec
DELETE FROM note_links
WHERE id = $1;

-- name: ListOutgoingLinks :many
SELECT nl.*, n.title AS target_note_title
FROM note_links nl
JOIN notes n ON nl.target_note_id = n.id
WHERE nl.source_note_id = $1
ORDER BY nl.created_at DESC;

-- name: ListIncomingLinks :many
SELECT nl.*, n.title AS source_note_title
FROM note_links nl
JOIN notes n ON nl.source_note_id = n.id
WHERE nl.target_note_id = $1
ORDER BY nl.created_at DESC;

-- name: GetLinkedNotes :many
SELECT DISTINCT n.*
FROM notes n
JOIN note_links nl ON n.id = nl.target_note_id OR n.id = nl.source_note_id
WHERE (nl.source_note_id = $1 OR nl.target_note_id = $1) AND n.id != $1
ORDER BY n.updated_at DESC;

-- name: SearchNoteLinks :many
SELECT nl.*, sn.title AS source_note_title, tn.title AS target_note_title
FROM note_links nl
JOIN notes sn ON nl.source_note_id = sn.id
JOIN notes tn ON nl.target_note_id = tn.id
WHERE nl.description ILIKE '%' || $1 || '%'
   OR sn.title ILIKE '%' || $1 || '%'
   OR tn.title ILIKE '%' || $1 || '%'
ORDER BY nl.created_at DESC
LIMIT $2 OFFSET $3;

-- name: GetMostLinkedNotes :many
SELECT n.id, n.title, COUNT(*) as link_count
FROM notes n
JOIN note_links nl ON n.id = nl.target_note_id
WHERE n.user_id = $1
GROUP BY n.id, n.title
ORDER BY link_count DESC
LIMIT $2;

-- name: GetNotesWithoutLinks :many
SELECT n.*
FROM notes n
LEFT JOIN (
    SELECT source_note_id AS note_id FROM note_links
    UNION
    SELECT target_note_id FROM note_links
) linked_notes ON n.id = linked_notes.note_id
WHERE linked_notes.note_id IS NULL AND n.user_id = $1
ORDER BY n.updated_at DESC
LIMIT $2 OFFSET $3;

-- name: GetLinksBetweenNotes :many
SELECT *
FROM note_links
WHERE (source_note_id = $1 AND target_note_id = $2)
   OR (source_note_id = $2 AND target_note_id = $1);

-- name: GetBidirectionalLinks :many
SELECT nl1.*, 
       n1.title AS source_note_title,
       n2.title AS target_note_title
FROM note_links nl1
JOIN note_links nl2 ON nl1.source_note_id = nl2.target_note_id AND nl1.target_note_id = nl2.source_note_id
JOIN notes n1 ON nl1.source_note_id = n1.id
JOIN notes n2 ON nl1.target_note_id = n2.id
WHERE nl1.id < nl2.id
ORDER BY nl1.created_at DESC;
