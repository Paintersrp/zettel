-- name: CreateTrail :one
INSERT INTO trails (user_id, title, description, visibility)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetTrail :one
SELECT t.*,
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
GROUP BY t.id;

-- name: UpdateTrail :one
UPDATE trails
SET title = $2, description = $3, visibility = $4, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteTrail :exec
DELETE FROM trails
WHERE id = $1;

-- name: ListTrailsByUser :many
SELECT t.*,
       COUNT(DISTINCT tn.note_id) AS note_count,
       COUNT(DISTINCT c.user_id) AS collaborator_count
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
WHERE t.user_id = $1
GROUP BY t.id
ORDER BY t.updated_at DESC
LIMIT $2 OFFSET $3;

-- name: SearchTrails :many
SELECT t.*,
       COUNT(DISTINCT tn.note_id) AS note_count,
       COUNT(DISTINCT c.user_id) AS collaborator_count
FROM trails t
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
LEFT JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
WHERE t.user_id = $1 AND (t.title ILIKE '%' || $2 || '%' OR t.description ILIKE '%' || $2 || '%')
GROUP BY t.id
ORDER BY t.updated_at DESC
LIMIT $3 OFFSET $4;

-- name: AddNoteToTrail :exec
INSERT INTO trail_notes (trail_id, note_id, position)
VALUES ($1, $2, (SELECT COALESCE(MAX(position), 0) + 1 FROM trail_notes WHERE trail_id = $1));

-- name: RemoveNoteFromTrail :exec
DELETE FROM trail_notes
WHERE trail_id = $1 AND note_id = $2;

-- name: UpdateNotePosition :exec
UPDATE trail_notes
SET position = $3
WHERE trail_id = $1 AND note_id = $2;

-- name: GetTrailNotes :many
SELECT n.*, tn.position
FROM notes n
JOIN trail_notes tn ON n.id = tn.note_id
WHERE tn.trail_id = $1
ORDER BY tn.position;

-- name: GetTrailsForNote :many
SELECT t.*
FROM trails t
JOIN trail_notes tn ON t.id = tn.trail_id
WHERE tn.note_id = $1
ORDER BY t.updated_at DESC;

-- name: AddCollaboratorToTrail :one
INSERT INTO collaborators (user_id, resource_type, resource_id, role)
VALUES ($1, 'trail', $2, $3)
RETURNING *;

-- name: RemoveCollaboratorFromTrail :exec
DELETE FROM collaborators
WHERE user_id = $1 AND resource_type = 'trail' AND resource_id = $2;

-- name: GetTrailCollaborators :many
SELECT u.id, u.username, u.email, c.role
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = 'trail' AND c.resource_id = $1
ORDER BY c.role, u.username;

-- name: ListCollaborativeTrails :many
SELECT t.*,
       COUNT(DISTINCT tn.note_id) AS note_count,
       c.role AS user_role
FROM trails t
JOIN collaborators c ON t.id = c.resource_id AND c.resource_type = 'trail'
LEFT JOIN trail_notes tn ON t.id = tn.trail_id
WHERE c.user_id = $1
GROUP BY t.id, c.role
ORDER BY t.updated_at DESC
LIMIT $2 OFFSET $3;

-- name: GetTrailStats :one
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
WHERE t.user_id = $1;

-- name: GetMostRecentTrailActivity :many
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
LIMIT $2;
