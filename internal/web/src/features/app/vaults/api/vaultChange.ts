import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"

interface VaultChangeMutationProps {
  vaultId: number
  userId: number
}

const vaultChange = async (
  props: VaultChangeMutationProps
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

const onVaultChangeSuccess = (client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success("Active vault change successful", {
      description: `You have successfully changed vaults. Redirecting...`,
    })
  }, 300)
}

const onVaultChangeError = (error: unknown) => {
  console.error("Vault change error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useVaultChange = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: vaultChange,
    onSuccess: () => onVaultChangeSuccess(client),
    onError: onVaultChangeError,
  })
}

export { useVaultChange, vaultChange }
