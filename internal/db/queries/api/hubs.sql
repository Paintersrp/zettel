-- name: CreateHub :one
INSERT INTO hubs (user_id, name, description, visibility)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetHub :one
SELECT * FROM hubs
WHERE id = $1 AND user_id = $2;

-- name: ListHubs :many
SELECT * FROM hubs
WHERE user_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;

-- name: UpdateHub :one
UPDATE hubs
SET name = $2, description = $3, visibility = $4, updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND user_id = $5
RETURNING *;

-- name: DeleteHub :exec
DELETE FROM hubs
WHERE id = $1 AND user_id = $2;

-- name: GetHubWithTrailsNotesAndSources :one
SELECT 
    h.id AS hub_id,
    h.name AS hub_name,
    h.description AS hub_description,
    h.visibility AS hub_visibility,
    h.created_at AS hub_created_at,
    h.updated_at AS hub_updated_at,
    json_agg(DISTINCT jsonb_build_object(
        'id', t.id,
        'title', t.title,
        'description', t.description,
        'visibility', t.visibility,
        'created_at', t.created_at,
        'updated_at', t.updated_at,
        'notes', (
            SELECT json_agg(jsonb_build_object(
                'id', n.id,
                'title', n.title,
                'content', n.content,
                'created_at', n.created_at,
                'updated_at', n.updated_at,
                'position', tn.position,
                'tags', (
                    SELECT string_agg(tg.name, ',')
                    FROM note_tags nt
                    JOIN tags tg ON tg.id = nt.tag_id
                    WHERE nt.note_id = n.id
                ),
                'sources', (
                    SELECT json_agg(jsonb_build_object(
                        'id', s.id,
                        'title', s.title,
                        'url', s.url,
                        'author', s.author,
                        'publication_date', s.publication_date
                    ))
                    FROM note_sources ns
                    JOIN sources s ON s.id = ns.source_id
                    WHERE ns.note_id = n.id
                )
            ))
            FROM trail_notes tn
            JOIN notes n ON n.id = tn.note_id
            WHERE tn.trail_id = t.id
            ORDER BY tn.position
        )
    )) FILTER (WHERE t.id IS NOT NULL) AS trails
FROM hubs h
LEFT JOIN trails t ON t.user_id = h.user_id
WHERE h.id = $1 AND h.user_id = $2
GROUP BY h.id;

-- name: GetHubSources :many
SELECT DISTINCT s.*
FROM hubs h
JOIN trails t ON t.user_id = h.user_id
JOIN trail_notes tn ON tn.trail_id = t.id
JOIN notes n ON n.id = tn.note_id
JOIN note_sources ns ON ns.note_id = n.id
JOIN sources s ON s.id = ns.source_id
WHERE h.id = $1 AND h.user_id = $2
ORDER BY s.created_at DESC;

-- name: SearchHubs :many
SELECT * FROM hubs
WHERE user_id = $1
  AND (name ILIKE '%' || $2 || '%' OR description ILIKE '%' || $2 || '%')
ORDER BY created_at DESC
LIMIT $3 OFFSET $4;

-- name: GetHubCollaborators :many
SELECT u.id, u.username, u.email, c.role
FROM collaborators c
JOIN users u ON u.id = c.user_id
WHERE c.resource_type = 'hub' AND c.resource_id = $1;

-- name: AddHubCollaborator :one
INSERT INTO collaborators (user_id, resource_type, resource_id, role)
VALUES ($1, 'hub', $2, $3)
RETURNING *;

-- name: RemoveHubCollaborator :exec
DELETE FROM collaborators
WHERE user_id = $1 AND resource_type = 'hub' AND resource_id = $2;

-- name: GetHubStats :one
SELECT 
    COUNT(DISTINCT t.id) AS trail_count,
    COUNT(DISTINCT n.id) AS note_count,
    COUNT(DISTINCT s.id) AS source_count
FROM hubs h
LEFT JOIN trails t ON t.user_id = h.user_id
LEFT JOIN trail_notes tn ON tn.trail_id = t.id
LEFT JOIN notes n ON n.id = tn.note_id
LEFT JOIN note_sources ns ON ns.note_id = n.id
LEFT JOIN sources s ON s.id = ns.source_id
WHERE h.id = $1 AND h.user_id = $2;
