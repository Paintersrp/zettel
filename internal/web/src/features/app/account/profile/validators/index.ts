import * as v from "valibot"

export const UpdateProfileSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(2, "Username must be at least 2 characters."),
    v.maxLength(30, "Username must not be longer than 30 characters.")
  ),
  email: v.pipe(v.string("Please select an email to display."), v.email()),
  preferred_name: v.optional(
    v.pipe(
      v.string(),
      v.maxLength(30, "Name must not be longer than 30 characters.")
    )
  ),
  bio: v.optional(v.pipe(v.string(), v.maxLength(160))),
})

export type UpdateProfileRequest = v.InferInput<typeof UpdateProfileSchema>
