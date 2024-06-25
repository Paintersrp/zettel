import { z } from "zod"

export const NotesFilterSchema = z.object({
  filter: z
    .enum(["all", "untagged", "unfulfilled", "fulfilled", "orphans"])
    .catch("all"),
})

export type NotesFilter = z.infer<typeof NotesFilterSchema>
