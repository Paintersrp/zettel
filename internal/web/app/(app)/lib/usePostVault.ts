import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { postVault } from "./postVault"

const onPostVaultSuccess = (router: AppRouterInstance) => {
  router.refresh()
  toast.success(`Vault creation successful`, {
    description: `You have successfully created a new vault.`,
  })
}

const onPostVaultError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const usePostVault = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: postVault,
    onSuccess: () => onPostVaultSuccess(router),
    onError: onPostVaultError,
  })
}

export { usePostVault }
