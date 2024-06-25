import { z } from "zod"

import { PASSWORD_REGEX } from "@/lib/const"

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        PASSWORD_REGEX,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password !== data.currentPassword, {
    message: "New password cannot be the same as the current password",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>
