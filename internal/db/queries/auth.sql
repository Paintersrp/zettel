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

-- name: GetUserWithVaults :one
SELECT u.id, u.username, u.email, r.name AS role_name, COALESCE(json_agg(v.* ORDER BY v.created_at DESC) FILTER (WHERE v.id IS NOT NULL), '[]') AS vaults
FROM users u
JOIN roles r ON u.role_id = r.id
LEFT JOIN vaults v ON u.id = v.user_id
WHERE u.id = $1
GROUP BY u.id, r.name;

