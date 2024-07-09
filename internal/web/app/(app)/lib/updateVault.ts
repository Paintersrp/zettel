import type { Vault } from "@/types/app"
import { fetch } from "@/lib/fetch"
import { VaultFormValues } from "@/lib/validators/vault"

type VaultUpdateDTO = VaultFormValues & { vaultId: number }

const updateVault = async (payload: VaultUpdateDTO): Promise<Vault> => {
  console.log(payload, "payload")
  const response = await fetch(`/v1/api/vaults/${payload.vaultId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  console.log(response, "response")

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return (await response.json()) as Vault
}

export { updateVault, type VaultUpdateDTO }
