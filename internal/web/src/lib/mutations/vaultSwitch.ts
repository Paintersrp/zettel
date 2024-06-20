import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import api from "@/lib/api"

export interface VaultSwitchRequest {
  id: number
}

interface VaultSwitchMutationProps {
  vaultId: number
  userId: number
}

const useVaultSwitchMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (props: VaultSwitchMutationProps) =>
      await vaultSwitchMutation(props),
    onSuccess: () => vaultSwitchSuccess(client),
    onError: vaultSwitchError,
  })
}

const vaultSwitchMutation = async (
  props: VaultSwitchMutationProps
): Promise<boolean> => {
  const res = await api.post("v1/auth/change-vault", {
    json: {
      vault_id: props.vaultId,
      user_id: props.userId,
    },
  })
  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }
  return true
}

const vaultSwitchSuccess = (client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })

  setTimeout(() => {
    toast.success("Active vault change successful", {
      description: `You have successfully changed vaults. Redirecting...`,
    })
  }, 300)
}

const vaultSwitchError = (error: unknown) => {
  console.error("Vault switch error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useVaultSwitchMutation, vaultSwitchMutation }
