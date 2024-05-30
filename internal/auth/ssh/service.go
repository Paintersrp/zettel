package ssh

import (
	"context"
	"errors"

	db "github.com/Paintersrp/zettel/internal/db"
	"golang.org/x/crypto/ssh"
)

type SSHService struct {
	queries *db.Queries
}

func NewSSHService(queries *db.Queries) *SSHService {
	return &SSHService{
		queries: queries,
	}
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

func (s *SSHService) CreateSSHKey(ctx context.Context, key *SSHKey) (db.SshKey, error) {
	publicKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(key.PublicKey))
	if err != nil {
		return db.SshKey{}, errors.New("invalid SSH public key")
	}

	fingerprint := ssh.FingerprintSHA256(publicKey)
	newKey := db.SaveSSHKeyParams{
		UserID:      key.UserID,
		PublicKey:   key.PublicKey,
		Name:        key.Name,
		Fingerprint: fingerprint,
	}

	sshKey, err := s.queries.SaveSSHKey(ctx, newKey)

	if err != nil {
		return db.SshKey{}, err
	}

	return sshKey, nil
}

func (s *SSHService) UpdateSSHKey(
	ctx context.Context,
	id int32,
	publicKey, name string,
) (db.SshKey, error) {
	parsedKey, _, _, _, err := ssh.ParseAuthorizedKey([]byte(publicKey))
	if err != nil {
		return db.SshKey{}, errors.New("invalid SSH public key")
	}

	fingerprint := ssh.FingerprintSHA256(parsedKey)
	key := db.UpdateSSHKeyParams{
		ID:          id,
		PublicKey:   publicKey,
		Name:        name,
		Fingerprint: fingerprint,
	}

	updatedKey, err := s.queries.UpdateSSHKey(ctx, key)

	if err != nil {
		return db.SshKey{}, err
	}

	return updatedKey, nil
}

func (s *SSHService) DeleteSSHKey(ctx context.Context, id int32) error {
	return s.queries.DeleteSSHKey(ctx, id)
}
