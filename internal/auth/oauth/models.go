package oauth

type GooglePayload struct {
	ID    string `json:"sub"`
	Email string `json:"email"`
}

type GithubPayload struct {
	Email string `json:"email"`
	Login string `json:"login"`
	ID    int    `json:"id"`
}
