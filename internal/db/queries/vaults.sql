-- name: CreateVault :one
INSERT INTO vaults (name, user_id, commit, description)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetPaginatedNotes :many
WITH paginated_notes AS (
    SELECT 
        n.id,
        n.title,
        n.user_id,
        n.vault_id,
        n.upstream,
        n.content,
        n.created_at,
        n.updated_at,
        row_number() OVER (ORDER BY n.created_at DESC) AS row_num
    FROM 
        notes n
    WHERE 
        n.vault_id = $1
        AND ($4::boolean IS NOT TRUE OR (
            SELECT COUNT(*) 
            FROM note_links nl 
            WHERE nl.note_id = n.id
        ) = 0)
        AND ($5::boolean IS NOT TRUE OR (
            SELECT COUNT(*) 
            FROM note_tags nt 
            WHERE nt.note_id = n.id
        ) = 0)
)
SELECT 
    pn.id,
    pn.title,
    pn.user_id,
    pn.vault_id,
    pn.upstream,
    pn.content,
    pn.created_at,
    pn.updated_at,
    COALESCE(JSON_AGG(tags.tag_info) FILTER (WHERE tags.tag_info IS NOT NULL), '[]'::json) AS tags,
    COALESCE(JSON_AGG(linked_notes.linked_note_info) FILTER (WHERE linked_notes.linked_note_info IS NOT NULL), '[]'::json) AS linked_notes
FROM 
    paginated_notes pn
LEFT JOIN (
    SELECT 
        nt.note_id,
        JSON_BUILD_OBJECT('id', t.id, 'name', t.name) AS tag_info
    FROM 
        note_tags nt
    LEFT JOIN 
        tags t ON nt.tag_id = t.id
) tags ON pn.id = tags.note_id
LEFT JOIN (
    SELECT 
        nl.note_id,
        JSON_BUILD_OBJECT('id', ln.id, 'title', ln.title) AS linked_note_info
    FROM 
        note_links nl
    LEFT JOIN 
        notes ln ON nl.linked_note_id = ln.id
) linked_notes ON pn.id = linked_notes.note_id
WHERE 
    pn.row_num BETWEEN ($2::int * $3::int) + 1 AND (($2::int + 1) * $3::int)
GROUP BY
    pn.id, pn.title, pn.user_id, pn.vault_id, pn.upstream, pn.content, pn.created_at, pn.updated_at
ORDER BY 
    pn.created_at DESC;


-- name: GetNoteCount :one
SELECT 
    COUNT(*) AS note_count
FROM 
    notes
WHERE 
    vault_id = $1
    AND ($2::boolean IS NOT TRUE OR (
        SELECT COUNT(*) 
        FROM note_links nl 
        WHERE nl.note_id = notes.id
    ) = 0)
    AND ($3::boolean IS NOT TRUE OR (
        SELECT COUNT(*) 
        FROM note_tags nt 
        WHERE nt.note_id = notes.id
    ) = 0);


-- name: HasMoreNotes :one
SELECT COUNT(*) > ($2 + $3) AS has_more
FROM notes
WHERE vault_id = $1;

-- name: GetVault :one
SELECT
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at,
    v.description
FROM vaults v
WHERE v.id = $1;

-- name: GetVaultsByUserLite :many
SELECT 
    v.id,
    v.name,
    v.user_id,
    v.commit,
    v.created_at,
    v.updated_at,
    v.description
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
    v.description,
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
SET name = $2, commit = $3, description = $4, updated_at = CURRENT_TIMESTAMP
WHERE id = $1
RETURNING *;

-- name: DeleteVault :exec
DELETE FROM vaults
WHERE id = $1;
