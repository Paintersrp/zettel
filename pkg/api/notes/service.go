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
	userID := pgtype.Int4{Int32: int32(id), Valid: true}

	notes, err := s.db.GetNotesByUser(context.Background(), userID)

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
