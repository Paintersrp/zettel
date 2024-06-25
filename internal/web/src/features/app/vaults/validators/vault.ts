import { z } from "zod"

export const VaultSchema = z.object({
  name: z.string().min(1, "Vault name is required"),
  description: z.string().optional(),
  makeActive: z.boolean().default(false),
})

export type VaultFormValues = z.infer<typeof VaultSchema>
