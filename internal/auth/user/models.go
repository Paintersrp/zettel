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

type VerifyEmailInput struct {
	Token string `json:"token" validate:"required"`
}

type UpdateProfileInput struct {
	ID            int32  `json:"user_id"`
	Username      string `json:"username"       validate:"required,min=3,max=255"`
	Email         string `json:"email"          validate:"required,email"`
	Bio           string `json:"bio"`
	PreferredName string `json:"preferred_name"`
}

type SendVerificationEmailInput struct {
	ID    int32  `json:"user_id"`
	Email string `json:"email"   validate:"required,email"`
}
