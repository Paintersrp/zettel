import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import api from "@/lib/api"

interface VaultSwitchMutationProps {
  vaultId: number
  userId: number
}

const useChangeVaultMutation = (props: VaultSwitchMutationProps) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => await changeVaultMutation(props),
    onSuccess: () => changeVaultSuccess(client),
    onError: changeVaultError,
  })
}

const changeVaultMutation = async (
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

const changeVaultSuccess = (client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success("Active vault change successful", {
      description: `You have successfully changed vaults. Redirecting...`,
    })
  }, 300)
}

const changeVaultError = (error: unknown) => {
  console.error("Vault change error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useChangeVaultMutation, changeVaultMutation }
