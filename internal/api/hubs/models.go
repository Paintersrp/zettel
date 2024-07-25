package hubs

type HubPayload struct {
	Name        string
	Description string
	Visibility  string
	ID          int32
	UserID      int32
}

type CollaboratorPayload struct {
	Role   string `json:"role"`
	UserID int32  `json:"userId"`
}
