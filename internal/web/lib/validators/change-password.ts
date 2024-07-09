import * as v from "valibot"

import { PASSWORD_REGEX } from "@/lib/const"

export const ChangePasswordSchema = v.object({
  currentPassword: v.pipe(
    v.string(),
    v.minLength(1, "Current password is required")
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters."),
    v.regex(
      PASSWORD_REGEX,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
  ),
  confirmPassword: v.string(),
})

export type ChangePasswordRequest = v.InferInput<typeof ChangePasswordSchema>
