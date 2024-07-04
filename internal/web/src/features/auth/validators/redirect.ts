import * as v from "valibot"

export const RedirectSearchSchema = v.object({
  redirect: v.optional(v.string()),
})

export type RedirectSearchRequest = v.InferInput<typeof RedirectSearchSchema>
