import * as v from "valibot"

import { PASSWORD_REGEX } from "@/lib/const"

export const RegisterSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
  username: v.pipe(
    v.string(),
    v.minLength(3, "Username must be at least 3 characters"),
    v.maxLength(20, "Username must be at most 20 characters"),
    v.regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric characters and underscores"
    )
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

export type RegisterRequest = v.InferInput<typeof RegisterSchema>
