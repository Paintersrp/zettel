-- name: SaveSSHKey :one
INSERT INTO ssh_keys (user_id, public_key, name, fingerprint)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetSSHKeys :many
SELECT
    k.id,
    k.user_id,
    k.public_key,
    k.name,
    k.fingerprint,
    k.created_at,
    k.updated_at
FROM
    ssh_keys k
INNER JOIN
    users u ON k.user_id = u.id
WHERE
    k.user_id = $1;

-- name: GetSSHKey :one
SELECT
    id,
    user_id,
    public_key,
    name,
    fingerprint,
    created_at,
    updated_at
FROM
    ssh_keys
WHERE
    id = $1;

-- name: UpdateSSHKey :one
UPDATE ssh_keys
SET
    public_key = $2,
    name = $3,
    fingerprint = $4
WHERE
    id = $1
RETURNING id, user_id, public_key, name, fingerprint, created_at, updated_at;

-- name: DeleteSSHKey :exec
DELETE FROM ssh_keys
WHERE id = $1;
