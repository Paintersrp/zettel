-- name: CreateAction :one
INSERT INTO actions (user_id, assignee_id, title, description, priority, status, due_date)
VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetAction :one
SELECT * FROM actions
WHERE id = $1 AND user_id = $2;

-- name: UpdateAction :one
UPDATE actions
SET assignee_id = $2,
    title = $3,
    description = $4,
    priority = $5,
    status = $6,
    due_date = $7,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND user_id = $8
RETURNING *;

-- name: DeleteAction :exec
DELETE FROM actions
WHERE id = $1 AND user_id = $2;

-- name: ListActionsByUser :many
SELECT * FROM actions
WHERE user_id = $1
ORDER BY due_date ASC NULLS LAST, created_at DESC
LIMIT $2 OFFSET $3;

-- name: ListActionsByAssignee :many
SELECT * FROM actions
WHERE assignee_id = $1
ORDER BY due_date ASC NULLS LAST, created_at DESC
LIMIT $2 OFFSET $3;

-- name: SearchActions :many
SELECT * FROM actions
WHERE user_id = $1
  AND (title ILIKE '%' || $2 || '%' OR description ILIKE '%' || $2 || '%')
ORDER BY due_date ASC NULLS LAST, created_at DESC
LIMIT $3 OFFSET $4;

-- name: GetActionsByStatus :many
SELECT * FROM actions
WHERE user_id = $1 AND status = $2
ORDER BY due_date ASC NULLS LAST, created_at DESC
LIMIT $3 OFFSET $4;

-- name: GetActionsByPriority :many
SELECT * FROM actions
WHERE user_id = $1 AND priority = $2
ORDER BY due_date ASC NULLS LAST, created_at DESC
LIMIT $3 OFFSET $4;

-- name: GetOverdueActions :many
SELECT * FROM actions
WHERE user_id = $1 AND due_date < CURRENT_DATE AND status != 'done'
ORDER BY due_date ASC;

-- name: GetUpcomingActions :many
SELECT * FROM actions
WHERE user_id = $1 
  AND due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
  AND status != 'done'
ORDER BY due_date ASC;

-- name: UpdateActionStatus :one
UPDATE actions
SET status = $2, 
    completed_at = CASE WHEN $2 = 'done' THEN CURRENT_TIMESTAMP ELSE NULL END,
    updated_at = CURRENT_TIMESTAMP
WHERE id = $1 AND user_id = $3
RETURNING *;

--
-- Note Actions Queries
--

-- name: AddActionToNote :exec
INSERT INTO note_actions (note_id, action_id)
VALUES ($1, $2)
ON CONFLICT (note_id, action_id) DO NOTHING;

-- name: RemoveActionFromNote :exec
DELETE FROM note_actions
WHERE note_id = $1 AND action_id = $2;

-- name: GetActionsForNote :many
SELECT a.* FROM actions a
JOIN note_actions na ON a.id = na.action_id
WHERE na.note_id = $1
ORDER BY a.due_date ASC NULLS LAST, a.created_at DESC;

-- name: GetNotesForAction :many
SELECT n.* FROM notes n
JOIN note_actions na ON n.id = na.note_id
WHERE na.action_id = $1
ORDER BY n.updated_at DESC;

-- name: ListActionsWithNoteCount :many
SELECT a.*, COUNT(na.note_id) AS note_count
FROM actions a
LEFT JOIN note_actions na ON a.id = na.action_id
WHERE a.user_id = $1
GROUP BY a.id
ORDER BY a.due_date ASC NULLS LAST, a.created_at DESC
LIMIT $2 OFFSET $3;

-- name: GetActionCompletionStats :one
SELECT 
    COUNT(*) FILTER (WHERE status = 'done') AS completed_count,
    COUNT(*) FILTER (WHERE status != 'done') AS pending_count,
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at)) / 3600)::float AS avg_completion_time_hours
FROM actions
WHERE user_id = $1 AND created_at >= CURRENT_DATE - INTERVAL '30 days';

-- name: GetMostActiveNotes :many
SELECT n.id, n.title, COUNT(na.action_id) AS action_count
FROM notes n
JOIN note_actions na ON n.id = na.note_id
WHERE n.user_id = $1
GROUP BY n.id, n.title
ORDER BY action_count DESC
LIMIT $2;
