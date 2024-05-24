-- name: CreateUser :one
INSERT INTO users (username, hashed_password, email, role_id)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUser :one
SELECT u.*, r.name AS role_name
FROM users u
JOIN roles r ON u.role_id = r.id
WHERE u.id = $1;

-- name: GetUsers :many
SELECT u.*, r.name AS role_name
FROM users u
JOIN roles r ON u.role_id = r.id
ORDER BY u.created_at DESC;

-- name: UpdateUser :one
UPDATE users
SET username = $2, hashed_password = $3, email = $4, role_id = $5
WHERE id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT * FROM users 
WHERE email = $1;

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


