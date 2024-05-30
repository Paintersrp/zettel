package tags

import (
	"context"

	"github.com/Paintersrp/zettel/internal/db"
)

type TagService struct {
	db *db.Queries
}

func NewTagService(db *db.Queries) *TagService {
	return &TagService{
		db: db,
	}
}

func (s *TagService) All(ctx context.Context) ([]db.Tag, error) {
	return s.db.GetTags(ctx)
}

func (s *TagService) Create(ctx context.Context, name string) (db.Tag, error) {
	return s.db.CreateTag(ctx, name)
}

func (s *TagService) Read(ctx context.Context, id int32) (db.Tag, error) {
	return s.db.GetTag(ctx, id)
}

func (s *TagService) Update(
	ctx context.Context,
	id int32,
	name string,
) (db.Tag, error) {
	return s.db.UpdateTag(ctx, db.UpdateTagParams{
		ID:   id,
		Name: name,
	})
}

func (s *TagService) Delete(ctx context.Context, id int32) error {
	return s.db.DeleteTag(ctx, id)
}
