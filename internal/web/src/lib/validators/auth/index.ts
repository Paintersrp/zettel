import { ChangePasswordRequest, ChangePasswordSchema } from "./changePassword"
import { ForgotPasswordRequest, ForgotPasswordSchema } from "./forgotPassword"
import { LoginRequest, LoginSchema } from "./login"
import { RegisterRequest, RegisterSchema } from "./register"
import { ResetPasswordRequest, ResetPasswordSchema } from "./resetPassword"
import { UpdateProfileRequest, UpdateProfileSchema } from "./updateProfile"

export {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  UpdateProfileSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
}
export type {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  UpdateProfileRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
}
