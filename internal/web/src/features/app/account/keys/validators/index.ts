import * as v from "valibot"

export const KeySchema = v.object({})

export type KeyRequest = v.InferInput<typeof KeySchema>
