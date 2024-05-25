package notes

import "github.com/jackc/pgx/v5/pgtype"

type NotePayload struct {
	Title    string   `json:"title"       validate:"required"`
	NewTitle string   `json:"new_title"`
	Tags     []string `json:"tags"`
	UserID   int32    `json:"user_id"     validate:"required"`
	VaultID  int32    `json:"vault_id"    validate:"required"`
	Upstream *int32   `json:"upstream_id"`
	Links    []int32  `json:"links"`
	Content  string   `json:"content"     validate:"required"`
}

type NoteDeletePayload struct {
	UserID int32  `json:"user_id" validate:"required"`
	Title  string `json:"title"   validate:"required"`
}

type NoteOperation struct {
	Operation     string             `json:"operation"`
	UpdatePayload *NotePayload       `json:"update_payload,omitempty"`
	DeletePayload *NoteDeletePayload `json:"delete_payload,omitempty"`
}

type BulkNoteOperationPayload struct {
	Operations []NoteOperation `json:"operations"`
}

type NoteWithDetails struct {
	ID          int32
	Title       string
	UserID      pgtype.Int4
	VaultID     pgtype.Int4
	Upstream    pgtype.Int4
	Content     string
	CreatedAt   pgtype.Timestamptz
	UpdatedAt   pgtype.Timestamptz
	Tags        []Tag
	LinkedNotes []LinkedNote
}

type Tag struct {
	Name string `json:"name"`
	ID   int32  `json:"id"`
}

type LinkedNote struct {
	Title string `json:"Title"`
	ID    int32  `json:"ID"`
}
