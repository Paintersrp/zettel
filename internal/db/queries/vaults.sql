-- name: CreateVault :one
INSERT INTO vaults (name, user_id, commit)
VALUES ($1, $2, $3)
RETURNING *;

-- name: GetVault :one
SELECT 
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at,
    COALESCE(
        (SELECT json_agg(json_build_object(
            'id', n.id,
            'title', n.title,
            'user_id', n.user_id,
            'vault_id', n.vault_id,
            'upstream', n.upstream,
            'content', n.content,
            'created_at', n.created_at,
            'updated_at', n.updated_at,
            'tags', nt.tags,
            'linkedNotes', ln.linked_notes
        ))
        FROM (
            SELECT DISTINCT n.id, n.title, n.user_id, n.vault_id, n.upstream, n.content, n.created_at, n.updated_at
            FROM notes n
            WHERE n.vault_id = v.id
        ) n
        LEFT JOIN (
            SELECT 
                nt.note_id,
                json_agg(json_build_object(
                    'id', t.id,
                    'name', t.name
                )) AS tags
            FROM note_tags nt
            JOIN tags t ON nt.tag_id = t.id
            GROUP BY nt.note_id
        ) nt ON n.id = nt.note_id
        LEFT JOIN (
            SELECT 
                ln.note_id,
                json_agg(json_build_object(
                    'id', l.id,
                    'title', l.title
                )) AS linked_notes
            FROM note_links ln
            JOIN notes l ON ln.linked_note_id = l.id
            GROUP BY ln.note_id
        ) ln ON n.id = ln.note_id
    ), '[]') AS notes
FROM vaults v
WHERE v.id = $1
GROUP BY v.id;

-- name: GetVaultsByUserLite :many
SELECT 
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at
FROM vaults v
WHERE v.user_id = $1
ORDER BY v.created_at DESC;


-- name: GetVaultsByUser :many
SELECT 
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at,
    COALESCE(json_agg(json_build_object(
        'id', n.id,
        'title', n.title,
        'user_id', n.user_id,
        'vault_id', n.vault_id,
        'upstream', n.upstream,
        'content', n.content,
        'created_at', n.created_at,
        'updated_at', n.updated_at
    )) FILTER (WHERE n.id IS NOT NULL), '[]') AS notes
FROM vaults v
LEFT JOIN notes n ON v.id = n.vault_id
WHERE v.user_id = $1
GROUP BY v.id
ORDER BY v.created_at DESC;

-- name: UpdateVault :one
UPDATE vaults
SET name = $2, commit = $3, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteVault :exec
DELETE FROM vaults
WHERE id = $1;

-- name: GetUserVaultByName :one
SELECT *
FROM vaults
WHERE user_id = $1 AND name = $2;


-- name: GetUserVaultByNameFull :one
SELECT 
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at,
    COALESCE(json_agg(json_build_object(
        'id', n.id,
        'title', n.title,
        'user_id', n.user_id,
        'vault_id', n.vault_id,
        'upstream', n.upstream,
        'content', n.content,
        'created_at', n.created_at,
        'updated_at', n.updated_at
    )) FILTER (WHERE n.id IS NOT NULL), '[]') AS notes
FROM vaults v
LEFT JOIN notes n ON v.id = n.vault_id
WHERE v.user_id = $1 AND v.name = $2
GROUP BY v.id;

