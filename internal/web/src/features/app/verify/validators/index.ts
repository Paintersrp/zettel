import { z } from "zod"

export const VerifySchema = z.object({
  token: z.string().optional(),
})

export type VerifyValues = z.infer<typeof VerifySchema>
