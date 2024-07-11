import * as v from "valibot"

import { Vault } from "@/types/app"

export const VaultSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1, "Vault name is required")),
  description: v.optional(v.string()),
  makeActive: v.optional(v.boolean(), false),
})

export type VaultFormValues = v.InferInput<typeof VaultSchema>
