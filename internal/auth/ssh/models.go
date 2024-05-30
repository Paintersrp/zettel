package ssh

type SSHInput struct {
	PublicKey string `json:"public_key" validate:"required"`
	Name      string `json:"name"       validate:"required"`
}

type SSHKey struct {
	UserID      int32  `db:"user_id"`
	PublicKey   string `db:"public_key"`
	Name        string `db:"name"`
	Fingerprint string `db:"fingerprint"`
}
