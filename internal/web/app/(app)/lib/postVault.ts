import type { Vault } from "@/types/app"
import { fetch } from "@/lib/fetch"
import { VaultFormValues } from "@/lib/validators/vault"

const postVault = async (payload: VaultFormValues): Promise<Vault> => {
  const response = await fetch("/v1/api/vaults", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      description: payload.description,
      makeActive: payload.makeActive ?? false,
    }),
  })

  if (response.status !== 201) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export { postVault }
