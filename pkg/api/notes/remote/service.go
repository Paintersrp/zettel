package remote

import (
	"context"
	"fmt"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/jackc/pgx/v5/pgtype"
)

type RemoteService struct {
	db        *db.Queries
	validator *validate.Validator
}

func NewRemoteService(db *db.Queries, validator *validate.Validator) *RemoteService {
	return &RemoteService{
		db:        db,
		validator: validator,
	}
}

func (s *RemoteService) CreateNoteChange(
	ctx context.Context,
	note db.CreateNoteRow,
) error {
	noteID := pgtype.Int4{Int32: note.ID, Valid: true}
	title := pgtype.Text{String: note.Title, Valid: true}
	content := pgtype.Text{String: note.Content, Valid: true}
	_, err := s.db.CreateRemoteChange(ctx, db.CreateRemoteChangeParams{
		UserID:  note.UserID.Int32,
		NoteID:  noteID,
		Action:  "create",
		Title:   title,
		Content: content,
	})
	return err
}

func (s *RemoteService) UpdateNoteChange(
	ctx context.Context,
	note db.UpdateNoteRow,
) error {
	noteID := pgtype.Int4{Int32: note.ID, Valid: true}
	title := pgtype.Text{String: note.Title, Valid: true}
	content := pgtype.Text{String: note.Content, Valid: true}
	_, err := s.db.CreateRemoteChange(ctx, db.CreateRemoteChangeParams{
		UserID:  note.UserID.Int32,
		NoteID:  noteID,
		Action:  "update",
		Title:   title,
		Content: content,
	})
	return err
}

func (s *RemoteService) DeleteNoteChange(ctx context.Context, noteID int32) error {
	id := pgtype.Int4{Int32: noteID, Valid: true}
	title := pgtype.Text{String: "", Valid: true}
	content := pgtype.Text{String: "", Valid: true}
	_, err := s.db.CreateRemoteChange(ctx, db.CreateRemoteChangeParams{
		UserID:  0,
		NoteID:  id,
		Action:  "delete",
		Title:   title,
		Content: content,
	})
	return err
}

func (s *RemoteService) MarkChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *RemoteService) MarkTagChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteTagChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *RemoteService) MarkLinkChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteLinkChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *RemoteService) GetUnprocessedChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteChange, error) {
	return s.db.GetUnprocessedRemoteChanges(ctx, userID)
}

func (s *RemoteService) GetUnprocessedTagChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteTagChange, error) {
	return s.db.GetUnprocessedRemoteTagChanges(ctx, userID)
}

func (s *RemoteService) GetUnprocessedLinkChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteLinkChange, error) {
	return s.db.GetUnprocessedRemoteLinkChanges(
		ctx,
		userID,
	)
}
