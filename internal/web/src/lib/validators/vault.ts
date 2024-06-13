import { z } from "zod"

export const VaultSchema = z.object({
  name: z.string().min(1, "Vault name is required"),
})

export type VaultFormValues = z.infer<typeof VaultSchema>
