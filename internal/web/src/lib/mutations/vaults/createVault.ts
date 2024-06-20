import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { Vault } from "@/types/app"
import api from "@/lib/api"
import { VaultFormValues } from "@/lib/validators/vault"

const useCreateVaultMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (payload: VaultFormValues) =>
      await createVaultMutation(payload),
    onSuccess: () => createVaultSuccess(client),
    onError: createVaultError,
  })
}

const createVaultMutation = async (
  payload: VaultFormValues
): Promise<Vault> => {
  const res = await api.post("v1/api/vaults", {
    json: {
      name: payload.name,
      description: payload.description,
      makeActive: payload.makeActive ?? false,
    },
  })
  if (res.status !== 201) {
    throw new Error("Network response was not ok")
  }

  return (await res.json()) as Vault
}

const createVaultSuccess = (client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`Vault creation successful`, {
      description: `You have successfully created a new vault.`,
    })
  }, 300)
}

const createVaultError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useCreateVaultMutation }
