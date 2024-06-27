import { z } from "zod"

export const RedirectSearchSchema = z.object({
  redirect: z.string().optional(),
})
