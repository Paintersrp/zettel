-- name: CreateNote :one
INSERT INTO notes (title, user_id, content)
VALUES ($1, $2, $3)
RETURNING *, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT target_note_id FROM note_links WHERE source_note_id = notes.id)) AS linked_notes;

-- name: GetNote :one
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) FILTER (WHERE t.id IS NOT NULL) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) FILTER (WHERE ln.id IS NOT NULL) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.id = $1
GROUP BY
  n.id;

-- name: GetNotesByUser :many
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.user_id = $1
GROUP BY
  n.id;

-- name: UpdateNote :one
UPDATE notes
SET title = $2, content = $3, updated_at = CURRENT_TIMESTAMP
WHERE notes.id = $1
RETURNING *, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT linked_note_id FROM note_links WHERE note_id = notes.id)) AS linked_notes;

-- name: DeleteNote :exec
DELETE FROM notes
WHERE id = $1;

-- name: UpdateNoteByTitle :one
UPDATE notes
SET title = $3, content = $4, updated_at = CURRENT_TIMESTAMP
WHERE title = $1 AND user_id = $2
RETURNING *, (SELECT ARRAY(SELECT tags.name FROM tags INNER JOIN note_tags ON tags.id = note_tags.tag_id WHERE note_tags.note_id = notes.id)) AS tags, (SELECT ARRAY(SELECT target_note_id FROM note_links WHERE source_note_id = notes.id)) AS linked_notes;

-- name: DeleteNoteByTitle :exec
DELETE FROM notes
WHERE title = $1 AND user_id = $2;

-- name: SearchNotes :many
SELECT
  n.id,
  n.title,
  n.user_id,
  n.content,
  n.created_at,
  n.updated_at,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', t.id,
      'name', t.name
    )
  ) FILTER (WHERE t.id IS NOT NULL) AS tags,
  ARRAY_AGG(DISTINCT
    jsonb_build_object(
      'id', ln.id,
      'title', ln.title
    )
  ) FILTER (WHERE ln.id IS NOT NULL) AS linked_notes
FROM
  notes n
  LEFT JOIN note_tags nt ON n.id = nt.note_id
  LEFT JOIN tags t ON nt.tag_id = t.id
  LEFT JOIN note_links nl ON n.id = nl.note_id
  LEFT JOIN notes ln ON nl.linked_note_id = ln.id
WHERE
  n.title ILIKE '%' || $1 || '%'
GROUP BY
  n.id;
