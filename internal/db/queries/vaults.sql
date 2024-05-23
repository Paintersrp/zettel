-- name: CreateVault :one
INSERT INTO vaults (name, user_id)
VALUES ($1, $2)
RETURNING *;

-- name: GetVault :one
SELECT *
FROM vaults
WHERE id = $1;

-- name: GetVaultsByUser :many
SELECT *
FROM vaults
WHERE user_id = $1
ORDER BY created_at DESC;

-- name: UpdateVault :one
UPDATE vaults
SET name = $2, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteVault :exec
DELETE FROM vaults
WHERE id = $1;
