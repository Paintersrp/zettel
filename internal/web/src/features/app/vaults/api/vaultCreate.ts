import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { Vault } from "@/types/app"

import type { VaultFormValues } from "@/features/app/vaults/validators"

const vaultCreate = async (payload: VaultFormValues): Promise<Vault> => {
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

  return await res.json()
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
