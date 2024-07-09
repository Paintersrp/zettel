import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateActiveVault } from "./updateActiveVault"

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

const useUpdateActiveVault = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: updateActiveVault,
    onSuccess: () => onVaultChangeSuccess(router),
    onError: onVaultChangeError,
  })
}

export { useUpdateActiveVault }
