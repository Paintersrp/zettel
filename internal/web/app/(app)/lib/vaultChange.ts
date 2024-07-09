import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { fetch } from "@/lib/fetch"

// Need to refresh the jwt on vault change

interface VaultChangeMutationProps {
  vaultId: number
  userId: number
}

const vaultChange = async (
  props: VaultChangeMutationProps
): Promise<boolean> => {
  const response = await fetch("/v1/auth/change-vault", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      vault_id: props.vaultId,
      user_id: props.userId,
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return true
}

const onVaultChangeSuccess = (router: AppRouterInstance) => {
  router.refresh()
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
  const router = useRouter()

  return useMutation({
    mutationFn: vaultChange,
    onSuccess: () => onVaultChangeSuccess(router),
    onError: onVaultChangeError,
  })
}

export { useVaultChange, vaultChange }
