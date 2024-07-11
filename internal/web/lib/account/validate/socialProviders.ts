import * as v from "valibot"

export const ProviderSchema = v.object({})

export type ProviderRequest = v.InferInput<typeof ProviderSchema>
