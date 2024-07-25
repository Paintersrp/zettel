-- name: CreateSource :one
INSERT INTO sources (user_id, title, url, author, publication_date, content)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetSource :one
SELECT s.*, 
       (SELECT COUNT(*) FROM note_sources WHERE source_id = s.id) AS note_count
FROM sources s
WHERE s.id = $1 AND s.user_id = $2;

-- name: UpdateSource :one
UPDATE sources
SET title = $2, url = $3, author = $4, publication_date = $5, content = $6, updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND user_id = $7
RETURNING *;

-- name: DeleteSource :exec
DELETE FROM sources
WHERE id = $1 AND user_id = $2;

-- name: ListSources :many
SELECT s.*, 
       (SELECT COUNT(*) FROM note_sources WHERE source_id = s.id) AS note_count
FROM sources s
WHERE s.user_id = $1
ORDER BY s.created_at DESC
LIMIT $2 OFFSET $3;

-- name: SearchSources :many
SELECT s.*, 
       (SELECT COUNT(*) FROM note_sources WHERE source_id = s.id) AS note_count
FROM sources s
WHERE s.user_id = $1
  AND (s.title ILIKE '%' || $2 || '%' 
       OR s.author ILIKE '%' || $2 || '%' 
       OR s.content ILIKE '%' || $2 || '%')
ORDER BY s.created_at DESC
LIMIT $3 OFFSET $4;

-- name: GetSourcesByDateRange :many
SELECT s.*, 
       (SELECT COUNT(*) FROM note_sources WHERE source_id = s.id) AS note_count
FROM sources s
WHERE s.user_id = $1
  AND s.publication_date BETWEEN $2 AND $3
ORDER BY s.publication_date DESC
LIMIT $4 OFFSET $5;

--
-- Note Sources Queries
--

-- name: AddSourceToNote :exec
INSERT INTO note_sources (note_id, source_id)
VALUES ($1, $2)
ON CONFLICT (note_id, source_id) DO NOTHING;

-- name: RemoveSourceFromNote :exec
DELETE FROM note_sources
WHERE note_id = $1 AND source_id = $2;

-- name: GetSourcesForNote :many
SELECT s.*
FROM sources s
JOIN note_sources ns ON s.id = ns.source_id
WHERE ns.note_id = $1
ORDER BY s.created_at DESC;

-- name: GetNotesForSource :many
SELECT n.*
FROM notes n
JOIN note_sources ns ON n.id = ns.note_id
WHERE ns.source_id = $1
ORDER BY n.updated_at DESC;

-- name: ListSourcesWithNoteCounts :many
SELECT s.*, COUNT(ns.note_id) AS note_count
FROM sources s
LEFT JOIN note_sources ns ON s.id = ns.source_id
WHERE s.user_id = $1
GROUP BY s.id
ORDER BY s.created_at DESC
LIMIT $2 OFFSET $3;

--
-- Other Queries
--

-- name: GetMostReferencedSources :many
SELECT s.*, COUNT(ns.note_id) AS reference_count
FROM sources s
JOIN note_sources ns ON s.id = ns.source_id
WHERE s.user_id = $1
GROUP BY s.id
ORDER BY reference_count DESC
LIMIT $2;

-- name: GetUnreferencedSources :many
SELECT s.*
FROM sources s
LEFT JOIN note_sources ns ON s.id = ns.source_id
WHERE s.user_id = $1 AND ns.source_id IS NULL
ORDER BY s.created_at DESC
LIMIT $2 OFFSET $3;

-- name: GetSourcesWithSimilarTitles :many
SELECT s1.*, 
       s2.id AS similar_id, 
       s2.title AS similar_title,
       similarity(s1.title, s2.title) AS title_similarity
FROM sources s1
JOIN sources s2 ON s1.id < s2.id
WHERE s1.user_id = $1 AND s2.user_id = $1
  AND similarity(s1.title, s2.title) > 0.6
ORDER BY title_similarity DESC
LIMIT $2;

-- name: GetRecentlyAddedSourcesWithNotes :many
SELECT s.*, 
       json_agg(json_build_object('id', n.id, 'title', n.title)) AS linked_notes
FROM sources s
JOIN note_sources ns ON s.id = ns.source_id
JOIN notes n ON ns.note_id = n.id
WHERE s.user_id = $1
  AND s.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY s.id
ORDER BY s.created_at DESC
LIMIT $2;

-- name: SearchSourcesFullText :many
SELECT s.*, 
       ts_rank(to_tsvector('english', s.title || ' ' || COALESCE(s.author, '') || ' ' || COALESCE(s.content, '')), query) AS rank
FROM sources s, to_tsquery('english', $2) query
WHERE s.user_id = $1
  AND to_tsvector('english', s.title || ' ' || COALESCE(s.author, '') || ' ' || COALESCE(s.content, '')) @@ query
ORDER BY rank DESC
LIMIT $3 OFFSET $4;
