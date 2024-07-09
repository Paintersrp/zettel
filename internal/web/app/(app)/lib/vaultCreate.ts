import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import type { Vault } from "@/types/app"
import { fetch } from "@/lib/fetch"

import { VaultFormValues } from "../../../lib/validators/vault"

const vaultCreate = async (payload: VaultFormValues): Promise<Vault> => {
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

const onVaultCreateSuccess = (client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`Vault creation successful`, {
      description: `You have successfully created a new vault.`,
    })
  }, 300)
}

const onVaultCreateError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useVaultCreate = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: vaultCreate,
    onSuccess: () => onVaultCreateSuccess(client),
    onError: onVaultCreateError,
  })
}

export { useVaultCreate, vaultCreate }
