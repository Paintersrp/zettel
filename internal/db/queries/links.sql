-- name: AddLinkToNote :exec
INSERT INTO note_links (note_id, linked_note_id)
VALUES ($1, $2);

-- name: RemoveLinkFromNote :exec
DELETE FROM note_links
WHERE note_id = $1 AND linked_note_id = $2;

-- name: GetLinksByNote :many
SELECT n.* 
FROM notes n
JOIN note_links nl ON n.id = nl.linked_note_id
WHERE nl.note_id = $1;

-- name: GetLinkedNotes :many
SELECT n.* 
FROM notes n
JOIN note_links nl ON n.id = nl.note_id
WHERE nl.linked_note_id = $1;

-- name: FindOrCreateNoteLink :one
WITH ins AS (
    INSERT INTO note_links (note_id, linked_note_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
    RETURNING *
)
SELECT * FROM ins
UNION
SELECT * FROM note_links WHERE note_id = $1 AND linked_note_id = $2;
