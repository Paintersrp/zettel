import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { fetch } from "@/utils/fetch-client"

interface VaultChangeMutationProps {
  vaultId: number
  userId: number
}

const updateActiveVault = async (
  props: VaultChangeMutationProps
): Promise<string> => {
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

  const data: { token: string } = await response.json()

  return data.token
}

const onVaultChangeSuccess = (token: string, router: AppRouterInstance) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })
  toast.success("Active vault change successful", {
    description: `You have successfully changed vaults.`,
  })
  router.refresh()
}

const onVaultChangeError = (error: unknown) => {
  console.error("Vault change error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useUpdateActiveVault = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: updateActiveVault,
    onSuccess: (token: string) => onVaultChangeSuccess(token, router),
    onError: onVaultChangeError,
  })
}

export { useUpdateActiveVault }
