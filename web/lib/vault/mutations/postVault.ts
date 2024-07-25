"use server"

import "server-only"

import { Vault } from "@/types/app"
import { VaultFormValues } from "@/lib/vault/validate"
import { fetch } from "@/utils/fetch"

export type PostVaultResponse = {
  vault: Vault
  token: string
}

const postVault = async (
  payload: VaultFormValues
): Promise<PostVaultResponse> => {
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

  return await response.json()
}

export { postVault }
