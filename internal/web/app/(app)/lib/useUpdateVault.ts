import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { Vault } from "@/types/app"

import { updateVault } from "./updateVault"

const onUpdateVaultSuccess = (res: Vault, router: AppRouterInstance) => {
  router.refresh()
  toast.success(`Vault update successful`, {
    description: `You have successfully updated vault with id: ${res.id}.`,
  })
}

const onUpdateVaultError = (error: unknown) => {
  console.error("Create vault error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useUpdateVault = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: updateVault,
    onSuccess: (res: Vault) => onUpdateVaultSuccess(res, router),
    onError: onUpdateVaultError,
  })
}

export { useUpdateVault }
