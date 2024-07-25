package trails

import (
	"context"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type TrailService struct {
	db *db.Queries
}

func NewTrailService(db *db.Queries) *TrailService {
	return &TrailService{db: db}
}

func (s *TrailService) Create(
	ctx context.Context,
	payload TrailPayload,
) (db.Trail, error) {
	return s.db.CreateTrail(ctx, db.CreateTrailParams{
		UserID:      payload.UserID,
		Title:       payload.Title,
		Description: pgtype.Text{String: payload.Description, Valid: true},
		Visibility:  payload.Visibility,
	})
}

func (s *TrailService) Get(ctx context.Context, id int32) (db.GetTrailRow, error) {
	return s.db.GetTrail(ctx, id)
}

func (s *TrailService) Update(
	ctx context.Context,
	payload TrailPayload,
) (db.Trail, error) {
	return s.db.UpdateTrail(ctx, db.UpdateTrailParams{
		ID:          payload.ID,
		Title:       payload.Title,
		Description: pgtype.Text{String: payload.Description, Valid: true},
		Visibility:  payload.Visibility,
	})
}

func (s *TrailService) Delete(ctx context.Context, id int32) error {
	return s.db.DeleteTrail(ctx, id)
}

func (s *TrailService) All(
	ctx context.Context,
	userID int32,
	limit, offset int32,
) ([]db.ListTrailsByUserRow, error) {
	return s.db.ListTrailsByUser(ctx, db.ListTrailsByUserParams{
		UserID: userID,
		Limit:  limit,
		Offset: offset,
	})
}

func (s *TrailService) Search(
	ctx context.Context,
	userID int32,
	query string,
	limit, offset int32,
) ([]db.SearchTrailsRow, error) {
	return s.db.SearchTrails(ctx, db.SearchTrailsParams{
		UserID:  userID,
		Column2: pgtype.Text{String: query, Valid: true},
		Limit:   limit,
		Offset:  offset,
	})
}

func (s *TrailService) AddNoteToTrail(ctx context.Context, trailID, noteID int32) error {
	return s.db.AddNoteToTrail(ctx, db.AddNoteToTrailParams{
		TrailID: trailID,
		NoteID:  noteID,
	})
}

func (s *TrailService) RemoveNoteFromTrail(
	ctx context.Context,
	trailID, noteID int32,
) error {
	return s.db.RemoveNoteFromTrail(ctx, db.RemoveNoteFromTrailParams{
		TrailID: trailID,
		NoteID:  noteID,
	})
}

func (s *TrailService) UpdateNotePosition(
	ctx context.Context,
	trailID, noteID, position int32,
) error {
	return s.db.UpdateNotePosition(ctx, db.UpdateNotePositionParams{
		TrailID:  trailID,
		NoteID:   noteID,
		Position: position,
	})
}

func (s *TrailService) GetTrailNotes(
	ctx context.Context,
	trailID int32,
) ([]db.GetTrailNotesRow, error) {
	return s.db.GetTrailNotes(ctx, trailID)
}

func (s *TrailService) GetTrailsForNote(
	ctx context.Context,
	noteID int32,
) ([]db.Trail, error) {
	return s.db.GetTrailsForNote(ctx, noteID)
}

func (s *TrailService) AddCollaboratorToTrail(
	ctx context.Context,
	userID, trailID int32,
	role db.CollaboratorRole,
) (db.Collaborator, error) {
	return s.db.AddCollaboratorToTrail(ctx, db.AddCollaboratorToTrailParams{
		UserID:     userID,
		ResourceID: trailID,
		Role:       role,
	})
}

func (s *TrailService) RemoveCollaboratorFromTrail(
	ctx context.Context,
	userID, trailID int32,
) error {
	return s.db.RemoveCollaboratorFromTrail(ctx, db.RemoveCollaboratorFromTrailParams{
		UserID:     userID,
		ResourceID: trailID,
	})
}

func (s *TrailService) GetTrailCollaborators(
	ctx context.Context,
	trailID int32,
) ([]db.GetTrailCollaboratorsRow, error) {
	return s.db.GetTrailCollaborators(ctx, trailID)
}

func (s *TrailService) ListCollaborativeTrails(
	ctx context.Context,
	userID, limit, offset int32,
) ([]db.ListCollaborativeTrailsRow, error) {
	return s.db.ListCollaborativeTrails(ctx, db.ListCollaborativeTrailsParams{
		UserID: userID,
		Limit:  limit,
		Offset: offset,
	})
}

func (s *TrailService) GetTrailStats(
	ctx context.Context,
	userID int32,
) (db.GetTrailStatsRow, error) {
	return s.db.GetTrailStats(ctx, userID)
}

func (s *TrailService) GetMostRecentTrailActivity(
	ctx context.Context,
	userID, limit int32,
) ([]db.GetMostRecentTrailActivityRow, error) {
	return s.db.GetMostRecentTrailActivity(ctx, db.GetMostRecentTrailActivityParams{
		UserID: userID,
		Limit:  limit,
	})
}
