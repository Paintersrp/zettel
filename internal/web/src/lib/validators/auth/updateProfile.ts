import { z } from "zod"

export const UpdateProfileSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  preferred_name: z
    .string()
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    })
    .optional(),
  bio: z.string().max(160).optional(),
})

export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>
