-- name: CreateUser :one
WITH new_user AS (
    INSERT INTO users (username, hashed_password, email, role_id, verification_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
)
SELECT 
    new_user.*,
    verifications.token AS verification_token,
    verifications.expires_at AS verification_expires_at,
    verifications.created_at AS verification_created_at,
    verifications.updated_at AS verification_updated_at,
    verifications.status AS verification_status
FROM 
    new_user
LEFT JOIN 
    verifications
ON 
    new_user.verification_id = verifications.id;


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

-- name: UpdateUserProfile :one
UPDATE users
SET 
    username = $2, 
    email = $3, 
    bio = $4, 
    preferred_name = $5
WHERE 
    id = $1
RETURNING *;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id = $1;

-- name: GetUserByEmail :one
SELECT 
    users.*,
    verifications.token AS verification_token,
    verifications.expires_at AS verification_expires_at,
    verifications.created_at AS verification_created_at,
    verifications.updated_at AS verification_updated_at,
    verifications.status AS verification_status,
    verifications.email AS verification_email
FROM 
    users
LEFT JOIN 
    verifications
ON 
    users.verification_id = verifications.id
WHERE 
    users.email = $1;

-- name: GetUserWithVaults :one
SELECT 
    u.id, 
    u.username, 
    u.email, 
    u.bio,
    u.preferred_name,
    r.name AS role_name,
    v.status AS verification_status,
    v.email AS verification_email,
    COALESCE(
        json_agg(vlt.* ORDER BY vlt.created_at DESC) FILTER (WHERE vlt.id IS NOT NULL), 
        '[]'
    ) AS vaults
FROM 
    users u
JOIN 
    roles r ON u.role_id = r.id
LEFT JOIN 
    verifications v ON u.verification_id = v.id
LEFT JOIN 
    vaults vlt ON u.id = vlt.user_id
WHERE 
    u.id = $1
GROUP BY 
    u.id, 
    r.name,
    v.token,
    v.expires_at,
    v.created_at,
    v.updated_at,
    v.email,
    v.status;

-- name: GetVerificationByToken :one
SELECT * FROM verifications WHERE token = $1;

-- name: CreateVerification :one
INSERT INTO verifications (user_id, token, expires_at, email)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: UpdateVerification :one
WITH updated_user AS (
    UPDATE users
    SET verification_id = $2
    WHERE users.id = $1  
    RETURNING *
)
SELECT 
    updated_user.*,
    verifications.token,
    verifications.expires_at,
    verifications.created_at,
    verifications.updated_at,
    verifications.status,
    verifications.email AS verification_email
FROM 
    updated_user
LEFT JOIN 
    verifications
ON 
    updated_user.verification_id = verifications.id;

-- name: UpdateVerificationStatus :one
UPDATE verifications
SET status = $2
WHERE id = $1
RETURNING *;
