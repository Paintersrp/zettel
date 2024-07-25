package trails

import "github.com/Paintersrp/zettel/internal/db"

type TrailPayload struct {
	Title       string            `json:"title"       validate:"required"`
	Description string            `json:"description"`
	Visibility  db.VisibilityType `json:"visibility"  validate:"required"`
	ID          int32             `json:"id"`
	UserID      int32             `json:"userId"`
}

type AddNoteToTrailPayload struct {
	NoteID int32 `json:"noteId" validate:"required"`
}

type UpdateNotePositionPayload struct {
	NoteID   int32 `json:"noteId"   validate:"required"`
	Position int32 `json:"position" validate:"required"`
}

type CollaboratorPayload struct {
	Role   db.CollaboratorRole `json:"role"   validate:"required"`
	UserID int32               `json:"userId" validate:"required"`
}
