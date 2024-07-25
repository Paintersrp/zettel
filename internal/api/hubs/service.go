package hubs

import (
	"context"

	"github.com/Paintersrp/zettel/internal/db"
	"github.com/jackc/pgx/v5/pgtype"
)

type HubService struct {
	db *db.Queries
}

func NewHubService(db *db.Queries) *HubService {
	return &HubService{
		db: db,
	}
}

func (s *HubService) Create(ctx context.Context, payload HubPayload) (db.Hub, error) {
	hub, err := s.db.CreateHub(ctx, db.CreateHubParams{
		UserID:      payload.UserID,
		Name:        payload.Name,
		Description: pgtype.Text{String: payload.Description, Valid: true},
		Visibility:  db.VisibilityType(payload.Visibility),
	})
	if err != nil {
		return db.Hub{}, err
	}
	return hub, nil
}

func (s *HubService) Get(
	ctx context.Context,
	id int32,
	userID int32,
) (db.Hub, error) {
	return s.db.GetHub(ctx, db.GetHubParams{
		ID:     id,
		UserID: userID,
	})
}

func (s *HubService) Update(ctx context.Context, payload HubPayload) (db.Hub, error) {
	hub, err := s.db.UpdateHub(ctx, db.UpdateHubParams{
		ID:          payload.ID,
		Name:        payload.Name,
		Description: pgtype.Text{String: payload.Description, Valid: true},
		Visibility:  db.VisibilityType(payload.Visibility),
		UserID:      payload.UserID,
	})
	if err != nil {
		return db.Hub{}, err
	}
	return hub, nil
}

func (s *HubService) Delete(ctx context.Context, id int32, userID int32) error {
	return s.db.DeleteHub(ctx, db.DeleteHubParams{
		ID:     id,
		UserID: userID,
	})
}

func (s *HubService) All(
	ctx context.Context,
	userID int32,
	limit, offset int32,
) ([]db.Hub, error) {
	return s.db.ListHubs(ctx, db.ListHubsParams{
		UserID: userID,
		Limit:  limit,
		Offset: offset,
	})
}

func (s *HubService) Search(
	ctx context.Context,
	userID int32,
	query string,
	limit, offset int32,
) ([]db.Hub, error) {
	return s.db.SearchHubs(ctx, db.SearchHubsParams{
		UserID:  userID,
		Column2: pgtype.Text{String: query, Valid: true},
		Limit:   limit,
		Offset:  offset,
	})
}

func (s *HubService) GetWithDetails(
	ctx context.Context,
	id int32,
	userID int32,
) (db.GetHubWithTrailsNotesAndSourcesRow, error) {
	return s.db.GetHubWithTrailsNotesAndSources(
		ctx,
		db.GetHubWithTrailsNotesAndSourcesParams{
			ID:     id,
			UserID: userID,
		},
	)
}

func (s *HubService) GetSources(
	ctx context.Context,
	hubID int32,
	userID int32,
) ([]db.Source, error) {
	return s.db.GetHubSources(ctx, db.GetHubSourcesParams{
		ID:     hubID,
		UserID: userID,
	})
}

func (s *HubService) AddCollaborator(
	ctx context.Context,
	hubID int32,
	userID int32,
	role db.CollaboratorRole,
) (db.Collaborator, error) {
	return s.db.AddHubCollaborator(ctx, db.AddHubCollaboratorParams{
		UserID:     userID,
		ResourceID: hubID,
		Role:       role,
	})
}

func (s *HubService) RemoveCollaborator(
	ctx context.Context,
	hubID int32,
	userID int32,
) error {
	return s.db.RemoveHubCollaborator(ctx, db.RemoveHubCollaboratorParams{
		UserID:     userID,
		ResourceID: hubID,
	})
}

func (s *HubService) GetCollaborators(
	ctx context.Context,
	hubID int32,
) ([]db.GetHubCollaboratorsRow, error) {
	return s.db.GetHubCollaborators(ctx, hubID)
}

// TODO: Hub Stats
