import { z } from "zod"

export const ProviderSchema = z.object({})

export type ProviderRequest = z.infer<typeof ProviderSchema>
