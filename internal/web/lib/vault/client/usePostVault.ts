import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import {
  postVault,
  type PostVaultResponse,
} from "@/lib/vault/mutations/postVault"

const onPostVaultSuccess = (
  res: PostVaultResponse,
  router: AppRouterInstance
) => {
  Cookies.set("jwt", res.token, { expires: 60, path: "/" })
  toast.success(`Vault creation successful`, {
    description: `You have successfully created a new vault.`,
  })
  router.refresh()
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
    onSuccess: (res) => onPostVaultSuccess(res, router),
    onError: onPostVaultError,
  })
}

export { usePostVault }
