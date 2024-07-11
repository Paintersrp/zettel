import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import type { Vault } from "@/types/app"
import { VaultFormValues } from "@/lib/vault/validate"
import { fetch } from "@/utils/fetch-client"

type VaultUpdateDTO = VaultFormValues & { vaultId: number }

const updateVault = async (payload: VaultUpdateDTO): Promise<Vault> => {
  const response = await fetch(`/v1/api/vaults/${payload.vaultId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return (await response.json()) as Vault
}

const onUpdateVaultSuccess = (res: Vault, router: AppRouterInstance) => {
  toast.success(`Vault update successful`, {
    description: `You have successfully updated vault with id: ${res.id}.`,
  })
  router.refresh()
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
