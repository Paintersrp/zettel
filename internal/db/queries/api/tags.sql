-- name: CreateTag :one
INSERT INTO tags (name)
VALUES ($1)
RETURNING *;

-- name: GetTag :one
SELECT * 
FROM tags 
WHERE id = $1;

-- name: GetTags :many
SELECT * 
FROM tags;

-- name: UpdateTag :one
UPDATE tags
SET name = $2
WHERE id = $1
RETURNING *;

-- name: DeleteTag :exec
DELETE FROM tags
WHERE id = $1;

-- name: AddTagToNote :exec
INSERT INTO note_tags (note_id, tag_id)
VALUES ($1, $2);

-- name: RemoveTagFromNote :exec
DELETE FROM note_tags
WHERE note_id = $1 AND tag_id = $2;

-- name: FindOrCreateTag :one
WITH ins AS (
    INSERT INTO tags (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING *
)
SELECT * FROM ins
UNION
SELECT * FROM tags WHERE name = $1;

-- name: GetNoteTagByNoteAndTag :one
SELECT *
FROM note_tags
WHERE note_id = $1 AND tag_id = $2;

-- name: GetTagByName :one
SELECT * FROM tags
WHERE name = $1;

-- name: GetTagsForNote :many
SELECT t.*
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.note_id = $1
ORDER BY t.name;

-- name: GetNotesForTag :many
SELECT n.*, 
       (SELECT COUNT(*) FROM note_sources WHERE note_id = n.id) AS source_count,
       (SELECT COUNT(*) FROM note_actions WHERE note_id = n.id) AS action_count
FROM notes n
JOIN note_tags nt ON n.id = nt.note_id
WHERE nt.tag_id = $1 AND n.user_id = $2
ORDER BY n.updated_at DESC
LIMIT $3 OFFSET $4;

-- name: GetTagUsageCount :one
SELECT COUNT(DISTINCT nt.note_id) as usage_count
FROM note_tags nt
JOIN notes n ON nt.note_id = n.id
WHERE nt.tag_id = $1 AND n.user_id = $2;

-- name: GetPopularTags :many
SELECT t.id, t.name, COUNT(DISTINCT nt.note_id) as usage_count
FROM tags t
JOIN note_tags nt ON t.id = nt.tag_id
JOIN notes n ON nt.note_id = n.id
WHERE n.user_id = $1
GROUP BY t.id, t.name
ORDER BY usage_count DESC
LIMIT $2;

-- name: SearchTags :many
SELECT * FROM tags
WHERE name ILIKE '%' || $1 || '%'
ORDER BY name
LIMIT $2 OFFSET $3;

-- name: GetUnusedTags :many
SELECT t.*
FROM tags t
LEFT JOIN note_tags nt ON t.id = nt.tag_id
WHERE nt.tag_id IS NULL
ORDER BY t.name
LIMIT $1 OFFSET $2;

-- name: MergeTags :exec
WITH moved_tags AS (
    UPDATE note_tags
    SET tag_id = $2
    WHERE tag_id = $1
    RETURNING *
)
DELETE FROM tags
WHERE id = $1;

-- name: GetRelatedTags :many
SELECT t2.id, t2.name, COUNT(*) as relation_strength
FROM note_tags nt1
JOIN note_tags nt2 ON nt1.note_id = nt2.note_id AND nt1.tag_id != nt2.tag_id
JOIN tags t2 ON nt2.tag_id = t2.id
WHERE nt1.tag_id = $1
GROUP BY t2.id, t2.name
ORDER BY relation_strength DESC
LIMIT $2;

-- name: GetTagsWithStats :many
SELECT t.id, t.name, 
       COUNT(DISTINCT nt.note_id) as note_count,
       COUNT(DISTINCT n.user_id) as user_count
FROM tags t
LEFT JOIN note_tags nt ON t.id = nt.tag_id
LEFT JOIN notes n ON nt.note_id = n.id
GROUP BY t.id, t.name
ORDER BY note_count DESC
LIMIT $1 OFFSET $2;
