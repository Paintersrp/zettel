package notes

import (
	"context"
	"fmt"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type NoteService struct {
	db *db.Queries
}

func NewNoteService(db *db.Queries) *NoteService {
	return &NoteService{
		db: db,
	}
}

func (s *NoteService) All(ctx context.Context, id int) ([]db.GetNotesByUserRow, error) {
	notes, err := s.db.GetNotesByUser(ctx, int32(id))

	if err != nil {
		return []db.GetNotesByUserRow{}, err
	}

	return notes, nil
}

func (s *NoteService) Create(
	ctx context.Context,
	payload NotePayload,
) (db.CreateNoteRow, error) {
	newNote := db.CreateNoteParams{
		Title:   payload.Title,
		UserID:  payload.UserID,
		Content: payload.Content,
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
	newNote := db.UpdateNoteParams{
		ID:      int32(id),
		Title:   payload.Title,
		Content: payload.Content,
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
		noteTagPayload := db.GetNoteTagByNoteAndTagParams{
			NoteID: noteID,
			TagID:  tag.ID,
		}
		_, findError = s.db.GetNoteTagByNoteAndTag(ctx, noteTagPayload)

		if findError != nil {
			if findError.Error() == "no rows in result set" {
				tagPayload := db.AddTagToNoteParams{
					NoteID: noteID,
					TagID:  tag.ID,
				}

				err = s.db.AddTagToNote(ctx, tagPayload)
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
		linkPayload := db.FindOrCreateNoteLinkParams{
			SourceNoteID: pgtype.Int4{Int32: noteID, Valid: true},
			TargetNoteID: pgtype.Int4{Int32: linkedNoteID, Valid: true},
		}
		_, err := s.db.FindOrCreateNoteLink(ctx, linkPayload)
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
	var newTitle string
	if payload.NewTitle == "" {
		newTitle = payload.Title
	} else {
		newTitle = payload.NewTitle
	}

	newNote := db.UpdateNoteByTitleParams{
		UserID:  payload.UserID,
		Title:   payload.Title,
		Title_2: newTitle,
		Content: payload.Content,
	}

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
	note := db.DeleteNoteByTitleParams{
		UserID: payload.UserID,
		Title:  payload.Title,
	}

	return s.db.DeleteNoteByTitle(ctx, note)
}

func (s *NoteService) SearchNotes(
	ctx context.Context,
	vaultID pgtype.Int4,
	searchQuery string,
) ([]db.SearchNotesRow, error) {
	notes, err := s.db.SearchNotes(ctx, pgtype.Text{String: searchQuery, Valid: true})
	if err != nil {
		return nil, err
	}

	return notes, nil
}
