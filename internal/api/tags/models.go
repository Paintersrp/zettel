package tags

type TagPayload struct {
	Name string `json:"name" validate:"required"`
}
