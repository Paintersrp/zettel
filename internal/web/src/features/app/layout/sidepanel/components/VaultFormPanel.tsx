import { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useVaultCreate } from "@/features/app/vaults/api/vaultCreate"
import { VaultForm } from "@/features/app/vaults/components/VaultForm"
import { useVaultCreateModal } from "@/features/app/vaults/stores/vaultCreateModal"
import {
  VaultSchema,
  type VaultFormValues,
} from "@/features/app/vaults/validators"

export const VaultFormPanel = () => {
  const modal = useVaultCreateModal()
  const createMutation = useVaultCreate()
  const { openPanel } = useSidePanel()

  const form = useForm<VaultFormValues>({
    resolver: zodResolver(VaultSchema),
    mode: "onChange",
  })

  const onSubmit = useCallback(
    (data: VaultFormValues) => {
      createMutation.mutate(data, {
        onSuccess: () => openPanel("search", "global"),
      })
    },
    [createMutation, modal]
  )

  return (
    <VaultForm
      className="p-4"
      form={form}
      onSubmit={onSubmit}
      isLoading={createMutation.isPending}
    />
  )
}

export default VaultFormPanel
