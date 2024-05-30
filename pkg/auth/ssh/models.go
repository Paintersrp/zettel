package ssh

type SSHInput struct {
	Name      string `json:"name"`
	PublicKey string `json:"public_key"`
}

type SSHKey struct {
	UserID      int32  `db:"user_id"`
	PublicKey   string `db:"public_key"`
	Name        string `db:"name"`
	Fingerprint string `db:"fingerprint"`
}
