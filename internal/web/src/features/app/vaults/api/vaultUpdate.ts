import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { Vault } from "@/types/app"

import type { VaultFormValues } from "@/features/app/vaults/validators"

type VaultUpdateDTO = VaultFormValues & { vaultId: number }

const vaultUpdate = async (payload: VaultUpdateDTO): Promise<Vault> => {
  const res = await api.patch(`v1/api/vaults/${payload.vaultId}`, {
    json: payload,
  })
  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }

  return (await res.json()) as Vault
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
