-- name: AddCollaborator :one
INSERT INTO collaborators (user_id, resource_type, resource_id, role)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: RemoveCollaborator :exec
DELETE FROM collaborators
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3;

-- name: UpdateCollaboratorRole :one
UPDATE collaborators
SET role = $4
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3
RETURNING *;

-- name: GetCollaborator :one
SELECT c.*, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.user_id = $1 AND c.resource_type = $2 AND c.resource_id = $3;

-- name: ListCollaboratorsForResource :many
SELECT c.*, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2
ORDER BY c.role, u.username;

-- name: ListCollaborationsForUser :many
SELECT c.*, 
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE c.user_id = $1
ORDER BY c.resource_type, c.invited_at DESC;

-- name: SearchCollaborators :many
SELECT c.*, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2
  AND (u.username ILIKE '%' || $3 || '%' OR u.email ILIKE '%' || $3 || '%')
ORDER BY u.username;

-- TODO: GetCollaborationStats :one

-- name: GetRecentCollaborations :many
SELECT c.*, 
       u.username, 
       u.email,
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
JOIN users u ON c.user_id = u.id
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE (c.resource_type = 'hub' AND h.user_id = $1) 
   OR (c.resource_type = 'trail' AND t.user_id = $1)
ORDER BY c.invited_at DESC
LIMIT $2;

-- name: GetPendingCollaborationInvites :many
SELECT c.*, 
       u.username, 
       u.email,
       CASE 
         WHEN c.resource_type = 'hub' THEN h.name
         WHEN c.resource_type = 'trail' THEN t.title
       END AS resource_name
FROM collaborators c
JOIN users u ON c.user_id = u.id
LEFT JOIN hubs h ON c.resource_type = 'hub' AND c.resource_id = h.id
LEFT JOIN trails t ON c.resource_type = 'trail' AND c.resource_id = t.id
WHERE c.user_id = $1 AND c.accepted_at IS NULL
ORDER BY c.invited_at DESC;

-- name: AcceptCollaborationInvite :one
UPDATE collaborators
SET accepted_at = CURRENT_TIMESTAMP
WHERE user_id = $1 AND resource_type = $2 AND resource_id = $3 AND accepted_at IS NULL
RETURNING *;

-- name: GetCollaboratorsByRole :many
SELECT c.*, u.username, u.email
FROM collaborators c
JOIN users u ON c.user_id = u.id
WHERE c.resource_type = $1 AND c.resource_id = $2 AND c.role = $3
ORDER BY u.username;
