package notes

import (
	"context"
	"fmt"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/jackc/pgx/v5/pgtype"
)

type NoteService struct {
	db        *db.Queries
	validator *validate.Validator
}

func NewNoteService(db *db.Queries, validator *validate.Validator) *NoteService {
	return &NoteService{
		db:        db,
		validator: validator,
	}
}

func (s *NoteService) All(ctx context.Context, id int) ([]db.GetNotesByUserRow, error) {
	args := db.GetNotesByUserParams{
		UserID:  pgtype.Int4{Int32: int32(id), Valid: true},
		VaultID: pgtype.Int4{Int32: int32(2), Valid: true},
	}

	notes, err := s.db.GetNotesByUser(context.Background(), args)

	if err != nil {
		return []db.GetNotesByUserRow{}, err
	}

	return notes, nil
}

func (s *NoteService) Create(
	ctx context.Context,
	payload NotePayload,
) (db.CreateNoteRow, error) {
	if err := s.validator.Validate(payload); err != nil {
		return db.CreateNoteRow{}, fmt.Errorf("validation error: %w", err)
	}

	newNote := db.CreateNoteParams{
		Title:    payload.Title,
		UserID:   pgtype.Int4{Int32: payload.UserID, Valid: true},
		VaultID:  pgtype.Int4{Int32: payload.VaultID, Valid: true},
		Upstream: s.checkUpstream(payload),
		Content:  payload.Content,
	}

	note, err := s.db.CreateNote(ctx, newNote)
	if err != nil {
		return db.CreateNoteRow{}, err
	}

	tags, links, err := s.handleTagsAndLinks(ctx, note.ID, payload.Tags, payload.Links)
	if err != nil {
		return db.CreateNoteRow{}, err
	}

	note.Tags = tags
	note.LinkedNotes = links

	return note, nil
}

func (s *NoteService) Update(
	id int,
	ctx context.Context,
	payload NotePayload,
) (db.UpdateNoteRow, error) {
	if err := s.validator.Validate(payload); err != nil {
		return db.UpdateNoteRow{}, fmt.Errorf("validation error: %w", err)
	}

	newNote := db.UpdateNoteParams{
		ID:       int32(id),
		Title:    payload.Title,
		Content:  payload.Content,
		Upstream: s.checkUpstream(payload),
	}

	note, err := s.db.UpdateNote(ctx, newNote)
	if err != nil {
		return db.UpdateNoteRow{}, err
	}

	tags, links, err := s.handleTagsAndLinks(ctx, note.ID, payload.Tags, payload.Links)
	if err != nil {
		return db.UpdateNoteRow{}, err
	}

	note.Tags = tags
	note.LinkedNotes = links

	return note, nil
}

func (s *NoteService) Read(ctx context.Context, id int) (db.GetNoteRow, error) {
	return s.db.GetNote(ctx, int32(id))
}

func (s *NoteService) Delete(ctx context.Context, id int) error {
	return s.db.DeleteNote(ctx, int32(id))
}

func (s *NoteService) handleTagsAndLinks(
	ctx context.Context,
	noteID int32,
	tags []string,
	links []int32,
) ([]string, []int32, error) {
	var tagsResult []string
	for _, tagName := range tags {
		tag, err := s.db.FindOrCreateTag(ctx, tagName)
		if err != nil {
			return nil, nil, err
		}
		var findError error
		_, findError = s.db.GetNoteTagByNoteAndTag(
			context.Background(),
			db.GetNoteTagByNoteAndTagParams{
				NoteID: noteID,
				TagID:  tag.ID,
			},
		)

		if findError != nil {
			if findError.Error() == "no rows in result set" {
				err = s.db.AddTagToNote(context.Background(), db.AddTagToNoteParams{
					NoteID: noteID,
					TagID:  tag.ID,
				})
				if err != nil {
					return nil, nil, err
				}
			} else {
				return nil, nil, findError
			}
		}
		tagsResult = append(tagsResult, tagName)
	}

	var linksResult []int32
	for _, linkedNoteID := range links {
		_, err := s.db.FindOrCreateNoteLink(
			ctx,
			db.FindOrCreateNoteLinkParams{
				NoteID:       noteID,
				LinkedNoteID: linkedNoteID,
			},
		)
		if err != nil {
			return nil, nil, err
		}
		linksResult = append(linksResult, linkedNoteID)
	}

	return tagsResult, linksResult, nil
}

func (s *NoteService) checkUpstream(payload NotePayload) pgtype.Int4 {
	var upstream pgtype.Int4
	if payload.Upstream != nil {
		upstream = pgtype.Int4{Int32: *payload.Upstream, Valid: true}
	} else {
		upstream = pgtype.Int4{Valid: false}
	}

	return upstream
}

func (s *NoteService) UpdateByTitle(
	ctx context.Context,
	payload NotePayload,
) (db.UpdateNoteByTitleRow, error) {
	if err := s.validator.Validate(payload); err != nil {
		return db.UpdateNoteByTitleRow{}, fmt.Errorf("validation error: %w", err)
	}

	userID := pgtype.Int4{Int32: payload.UserID, Valid: true}

	var newTitle string
	if payload.NewTitle == "" {
		newTitle = payload.Title
	} else {
		newTitle = payload.NewTitle
	}

	newNote := db.UpdateNoteByTitleParams{
		UserID:  userID,
		Title:   payload.Title,
		Title_2: newTitle,
		Content: payload.Content,
	}

	fmt.Println(newNote)

	note, err := s.db.UpdateNoteByTitle(ctx, newNote)
	if err != nil {
		fmt.Println(err)
		return db.UpdateNoteByTitleRow{}, err
	}

	tags, links, err := s.handleTagsAndLinks(ctx, note.ID, payload.Tags, payload.Links)
	if err != nil {
		return db.UpdateNoteByTitleRow{}, err
	}

	note.Tags = tags
	note.LinkedNotes = links

	return note, nil
}

func (s *NoteService) DeleteByTitle(
	ctx context.Context,
	payload NoteDeletePayload,
) error {
	if err := s.validator.Validate(payload); err != nil {
		return fmt.Errorf("validation error: %w", err)
	}

	userID := pgtype.Int4{Int32: payload.UserID, Valid: true}

	note := db.DeleteNoteByTitleParams{
		UserID: userID,
		Title:  payload.Title,
	}

	fmt.Println(note)

	return s.db.DeleteNoteByTitle(ctx, note)
}

func (s *NoteService) CreateRemoteNoteChange(
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

func (s *NoteService) UpdateRemoteNoteChange(
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

func (s *NoteService) DeleteRemoteNoteChange(ctx context.Context, noteID int32) error {
	id := pgtype.Int4{Int32: noteID, Valid: true}
	title := pgtype.Text{String: "", Valid: true}
	content := pgtype.Text{String: "", Valid: true}
	_, err := s.db.CreateRemoteChange(ctx, db.CreateRemoteChangeParams{
		UserID:  0, // Set appropriate user ID
		NoteID:  id,
		Action:  "delete",
		Title:   title,
		Content: content,
	})
	return err
}

func (s *NoteService) MarkRemoteChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *NoteService) MarkRemoteTagChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteTagChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *NoteService) MarkRemoteLinkChangeProcessed(
	ctx context.Context,
	changeID int32,
) error {
	err := s.db.MarkRemoteLinkChangeProcessed(ctx, changeID)
	if err != nil {
		return fmt.Errorf("failed to mark remote change as processed: %w", err)
	}
	return nil
}

func (s *NoteService) GetUnprocessedRemoteChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteChange, error) {
	return s.db.GetUnprocessedRemoteChanges(ctx, userID)
}

func (s *NoteService) GetUnprocessedRemoteTagChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteTagChange, error) {
	return s.db.GetUnprocessedRemoteTagChanges(ctx, userID)
}

func (s *NoteService) GetUnprocessedRemoteLinkChanges(
	ctx context.Context,
	userID int32,
) ([]db.RemoteLinkChange, error) {
	return s.db.GetUnprocessedRemoteLinkChanges(
		ctx,
		userID,
	)
}
