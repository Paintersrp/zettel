-- name: CreateRole :one
INSERT INTO roles (name)
VALUES ($1)
RETURNING *;

-- name: GetRole :one
SELECT r.*, array_agg(p.name) AS permissions
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE r.id = $1
GROUP BY r.id;

-- name: GetRoles :many
SELECT r.*, array_agg(p.name) AS permissions
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
GROUP BY r.id;

-- name: UpdateRole :one
UPDATE roles
SET name = $2
WHERE id = $1
RETURNING *;

-- name: DeleteRole :exec
DELETE FROM roles
WHERE id = $1;

