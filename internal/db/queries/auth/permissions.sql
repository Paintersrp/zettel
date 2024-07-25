-- name: CreatePermission :one
INSERT INTO permissions (name)
VALUES ($1)
RETURNING *;

-- name: GetPermission :one
SELECT *
FROM permissions
WHERE id = $1;

-- name: GetPermissions :many
SELECT *
FROM permissions;

-- name: UpdatePermission :one
UPDATE permissions
SET name = $2
WHERE id = $1
RETURNING *;

-- name: DeletePermission :exec
DELETE FROM permissions
WHERE id = $1;

