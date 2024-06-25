import { z } from "zod"

export const KeySchema = z.object({})

export type KeyRequest = z.infer<typeof KeySchema>
