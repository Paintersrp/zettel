-- name: GetUserByProvider :one
SELECT
    u.*,
    v.token AS verification_token,
    v.expires_at AS verification_expires_at,
    v.created_at AS verification_created_at,
    v.updated_at AS verification_updated_at,
    v.status AS verification_status,
    v.email AS verification_email
FROM
    users u
JOIN
    user_providers up ON u.id = up.user_id
JOIN
    providers p ON up.provider_id = p.id
LEFT JOIN
    verifications v ON u.verification_id = v.id
WHERE
    p.name = $1 AND up.provider_user_id = $2;

-- name: AddProviderForUser :exec
INSERT INTO user_providers (user_id, provider_id, provider_user_id)
VALUES (
    (SELECT id FROM users WHERE email = $1),
    (SELECT id FROM providers WHERE name = $2),
    $3
);

-- name: GetProvidersForUser :many
SELECT p.name, up.provider_user_id
FROM user_providers up
JOIN providers p ON up.provider_id = p.provider_id
WHERE up.user_id = (SELECT user_id FROM users WHERE email = $1);
