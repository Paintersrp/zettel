import { useCallback, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useVaultUpdate } from "@/features/app/vaults/api/vaultUpdate"
import { VaultForm } from "@/features/app/vaults/components/VaultForm"
import { useVaultUpdateModal } from "@/features/app/vaults/stores/vaultUpdateModal"
import {
  VaultSchema,
  type VaultFormValues,
} from "@/features/app/vaults/validators"

export const VaultEditFormPanel = () => {
  const updateModal = useVaultUpdateModal()
  const updateVaultMutation = useVaultUpdate()
  const { openPanel } = useSidePanel()

  const form = useForm<VaultFormValues>({
    defaultValues: updateModal.selectedVault ?? {},
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      if (updateModal.selectedVault) {
        updateVaultMutation.mutate(
          { ...data, vaultId: updateModal.selectedVault.id },
          {
            onSuccess: () => openPanel("search", "global"),
          }
        )
      }
    },
    [updateVaultMutation, updateModal, openPanel]
  )

  useEffect(() => {
    if (updateModal.selectedVault) form.reset({ ...updateModal.selectedVault })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateModal.selectedVault])

  return (
    <VaultForm
      className="p-4"
      form={form}
      onSubmit={onSubmit}
      isLoading={updateVaultMutation.isPending}
      isEdit={true}
    />
  )
}

export default VaultEditFormPanel
