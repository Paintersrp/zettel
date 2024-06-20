import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Vault } from "@/types/app"
import api from "@/lib/api"
import { VaultFormValues } from "@/lib/validators/vault"

const useUpdateVaultMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (payload: VaultFormValues & { vaultId: number }) =>
      await updateVaultMutation(payload),
    onSuccess: (res: Vault) => updateVaultSuccess(res, client),
    onError: updateVaultError,
  })
}

const updateVaultMutation = async (
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

const updateVaultSuccess = (res: Vault, client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`Vault update successful`, {
      description: `You have successfully updated vault with id: ${res.id}.`,
    })
  }, 300)
}

const updateVaultError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useUpdateVaultMutation }
