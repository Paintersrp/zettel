import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import type { Vault } from "@/types/app"
import { fetch } from "@/lib/fetch"

import { VaultFormValues } from "../../../lib/validators/vault"

type VaultUpdateDTO = VaultFormValues & { vaultId: number }

const vaultUpdate = async (payload: VaultUpdateDTO): Promise<Vault> => {
  const response = await fetch("/v1/api/vaults/${payload.vaultId}", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return (await response.json()) as Vault
}

const onVaultUpdateSuccess = (res: Vault, client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`Vault update successful`, {
      description: `You have successfully updated vault with id: ${res.id}.`,
    })
  }, 300)
}

const onVaultUpdateError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useVaultUpdate = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: vaultUpdate,
    onSuccess: (res: Vault) => onVaultUpdateSuccess(res, client),
    onError: onVaultUpdateError,
  })
}

export { useVaultUpdate, vaultUpdate, type VaultUpdateDTO }
