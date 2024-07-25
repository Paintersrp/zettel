import * as v from "valibot"

export const NoteSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1, "Note title is required")),
  content: v.pipe(v.string(), v.minLength(1, "Note content is required")),
  vault_id: v.number("Vault ID must be a number"),
  upstream: v.optional(v.number()),
  tags: v.optional(v.array(v.string())),
  linked_notes: v.optional(v.array(v.number())),
})

export type NoteFormValues = v.InferInput<typeof NoteSchema>
