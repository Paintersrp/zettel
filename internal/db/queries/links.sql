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
