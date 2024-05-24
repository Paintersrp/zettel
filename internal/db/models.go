// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package db

import (
	"database/sql/driver"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
)

type UserRole string

const (
	UserRoleAdmin  UserRole = "admin"
	UserRoleEditor UserRole = "editor"
	UserRoleUser   UserRole = "user"
)

func (e *UserRole) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UserRole(s)
	case string:
		*e = UserRole(s)
	default:
		return fmt.Errorf("unsupported scan type for UserRole: %T", src)
	}
	return nil
}

type NullUserRole struct {
	UserRole UserRole
	Valid    bool // Valid is true if UserRole is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUserRole) Scan(value interface{}) error {
	if value == nil {
		ns.UserRole, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UserRole.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUserRole) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.UserRole), nil
}

type UserRolePermissions string

const (
	UserRolePermissionsCreate UserRolePermissions = "create"
	UserRolePermissionsRead   UserRolePermissions = "read"
	UserRolePermissionsUpdate UserRolePermissions = "update"
	UserRolePermissionsDelete UserRolePermissions = "delete"
	UserRolePermissionsUser   UserRolePermissions = "user"
)

func (e *UserRolePermissions) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = UserRolePermissions(s)
	case string:
		*e = UserRolePermissions(s)
	default:
		return fmt.Errorf("unsupported scan type for UserRolePermissions: %T", src)
	}
	return nil
}

type NullUserRolePermissions struct {
	UserRolePermissions UserRolePermissions
	Valid               bool // Valid is true if UserRolePermissions is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullUserRolePermissions) Scan(value interface{}) error {
	if value == nil {
		ns.UserRolePermissions, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.UserRolePermissions.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullUserRolePermissions) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.UserRolePermissions), nil
}

type Note struct {
	ID        int32
	Title     string
	UserID    pgtype.Int4
	VaultID   pgtype.Int4
	Upstream  pgtype.Int4
	Content   string
	CreatedAt pgtype.Timestamptz
	UpdatedAt pgtype.Timestamptz
}

type NoteLink struct {
	NoteID       int32
	LinkedNoteID int32
}

type NoteTag struct {
	NoteID int32
	TagID  int32
}

type Permission struct {
	ID   int32
	Name UserRolePermissions
}

type Role struct {
	ID   int32
	Name UserRole
}

type RolePermission struct {
	RoleID       int32
	PermissionID int32
}

type SshKey struct {
	ID          int32
	UserID      int32
	PublicKey   string
	Name        string
	Fingerprint string
	CreatedAt   pgtype.Timestamptz
	UpdatedAt   pgtype.Timestamptz
}

type Tag struct {
	ID   int32
	Name string
}

type User struct {
	ID             int32
	Username       string
	HashedPassword string
	Email          string
	RoleID         pgtype.Int4
	CreatedAt      pgtype.Timestamptz
	UpdatedAt      pgtype.Timestamptz
}

type Vault struct {
	ID        int32
	Name      string
	UserID    pgtype.Int4
	CreatedAt pgtype.Timestamptz
	UpdatedAt pgtype.Timestamptz
}
