import * as v from "valibot"

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email address")),
  password: v.pipe(v.string(), v.minLength(1, "Password is required")),
})

export type LoginRequest = v.InferInput<typeof LoginSchema>

export type LoginResponse = {
  token: string
}
