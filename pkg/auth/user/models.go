package user

type RegisterInput struct {
	Username  string `json:"username"   validate:"required,min=3,max=255"`
	Email     string `json:"email"      validate:"required,email"`
	Password  string `json:"password"   validate:"required,min=8"`
	PublicKey string `json:"public_key"`
}

type LoginInput struct {
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type ResetPasswordInput struct {
	Email       string `json:"email"        validate:"required,email"`
	NewPassword string `json:"new_password" validate:"required,min=8"`
}
