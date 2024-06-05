// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0
// source: permissions.sql

package db

import (
	"context"
)

const createPermission = `-- name: CreatePermission :one
INSERT INTO permissions (name)
VALUES ($1)
RETURNING id, name
`

func (q *Queries) CreatePermission(ctx context.Context, name UserRolePermissions) (Permission, error) {
	row := q.db.QueryRow(ctx, createPermission, name)
	var i Permission
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}

const deletePermission = `-- name: DeletePermission :exec
DELETE FROM permissions
WHERE id = $1
`

func (q *Queries) DeletePermission(ctx context.Context, id int32) error {
	_, err := q.db.Exec(ctx, deletePermission, id)
	return err
}

const getPermission = `-- name: GetPermission :one
SELECT id, name
FROM permissions
WHERE id = $1
`

func (q *Queries) GetPermission(ctx context.Context, id int32) (Permission, error) {
	row := q.db.QueryRow(ctx, getPermission, id)
	var i Permission
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}

const getPermissions = `-- name: GetPermissions :many
SELECT id, name
FROM permissions
`

func (q *Queries) GetPermissions(ctx context.Context) ([]Permission, error) {
	rows, err := q.db.Query(ctx, getPermissions)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []Permission
	for rows.Next() {
		var i Permission
		if err := rows.Scan(&i.ID, &i.Name); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updatePermission = `-- name: UpdatePermission :one
UPDATE permissions
SET name = $2
WHERE id = $1
RETURNING id, name
`

type UpdatePermissionParams struct {
	ID   int32               `json:"id"`
	Name UserRolePermissions `json:"name"`
}

func (q *Queries) UpdatePermission(ctx context.Context, arg UpdatePermissionParams) (Permission, error) {
	row := q.db.QueryRow(ctx, updatePermission, arg.ID, arg.Name)
	var i Permission
	err := row.Scan(&i.ID, &i.Name)
	return i, err
}