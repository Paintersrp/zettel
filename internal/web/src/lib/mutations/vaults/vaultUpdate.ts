import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import type { Vault } from "@/types/app"
import { api } from "@/lib/api"
import type { VaultFormValues } from "@/lib/validators/vault"

const useVaultUpdateMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (payload: VaultFormValues & { vaultId: number }) =>
      await vaultUpdateMutation(payload),
    onSuccess: (res: Vault) => vaultUpdateSuccess(res, client),
    onError: vaultUpdateError,
  })
}

const vaultUpdateMutation = async (
  payload: VaultFormValues & { vaultId: number }
): Promise<Vault> => {
  const res = await api.patch(`v1/api/vaults/${payload.vaultId}`, {
    json: payload,
  })
  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }

  return (await res.json()) as Vault
}

const vaultUpdateSuccess = (res: Vault, client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`Vault update successful`, {
      description: `You have successfully updated vault with id: ${res.id}.`,
    })
  }, 300)
}

const vaultUpdateError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useVaultUpdateMutation }
