package ssh

import (
	"context"

	db "github.com/Paintersrp/zettel/internal/db"
)

type SSHService struct {
	queries *db.Queries
}

func NewSSHService(queries *db.Queries) *SSHService {
	return &SSHService{
		queries: queries,
	}
}

func (s *SSHService) SaveSSHKey(ctx context.Context, key *SSHKey) (db.SshKey, error) {
	return s.queries.SaveSSHKey(ctx, db.SaveSSHKeyParams{
		UserID:      key.UserID,
		PublicKey:   key.PublicKey,
		Name:        key.Name,
		Fingerprint: key.Fingerprint,
	})

}

func (s *SSHService) GetSSHKeys(
	ctx context.Context,
	userID int32,
) ([]db.SshKey, error) {
	return s.queries.GetSSHKeys(ctx, userID)
}

func (s *SSHService) GetSSHKey(
	ctx context.Context,
	id int32,
) (db.SshKey, error) {
	return s.queries.GetSSHKey(ctx, id)
}

func (s *SSHService) UpdateSSHKey(
	ctx context.Context,
	id int32,
	publicKey, name, fingerprint string,
) (db.SshKey, error) {
	return s.queries.UpdateSSHKey(
		ctx,
		db.UpdateSSHKeyParams{
			ID:          id,
			PublicKey:   publicKey,
			Name:        name,
			Fingerprint: fingerprint,
		},
	)
}

func (s *SSHService) DeleteSSHKey(ctx context.Context, id int32) error {
	return s.queries.DeleteSSHKey(ctx, id)
}
