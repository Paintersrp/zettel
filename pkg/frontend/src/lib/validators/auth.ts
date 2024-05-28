import { z } from "zod"

export const RegisterSchema = z.object({
  email: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
})

export type RegisterRequest = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
})

export type LoginRequest = z.infer<typeof LoginSchema>

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1),
})

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>
