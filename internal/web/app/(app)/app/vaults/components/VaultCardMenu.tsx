import { useCallback, type FC } from "react"

import type { Vault } from "@/types/app"
import { useDeleteMutation } from "@/lib/mutations/common/delete"
import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { useAuth } from "@/components/auth/provider"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { useUpdateActiveVault } from "@/app/(app)/lib/useUpdateActiveVault"
import { useVaultUpdateModal } from "@/app/(app)/state/vaultUpdateModal"

import { VaultCardDrawer } from "./VaultCardDrawer"
import { VaultCardDropdown } from "./VaultCardDropdown"

interface VaultCardMenuProps {
  formattedName: string
  vault: Vault
  isActive: boolean
}

export const VaultCardMenu: FC<VaultCardMenuProps> = ({
  formattedName,
  vault,
  isActive,
}) => {
  const { user } = useAuth()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmationModal()
  const updateModal = useVaultUpdateModal()
  const deleteMutation = useDeleteMutation({ id: vault.id, type: "vaults" })
  const updateActiveVaultMutation = useUpdateActiveVault()

  const onEdit = useCallback(() => {
    menu.setOpen(false)
    updateModal.setSelectedVault(vault)
    updateModal.setOpen(true)
  }, [menu, updateModal, vault])

  const onActivate = useCallback(() => {
    updateActiveVaultMutation.mutate({ userId: user!.id, vaultId: vault.id })
  }, [vault, updateActiveVaultMutation, user])

  return (
    <>
      <ConfirmationModal
        open={modal.open}
        onClose={modal.onClose}
        isLoading={deleteMutation.isPending}
        onConfirm={deleteMutation.mutate}
        title="Are you sure you want to delete this vault?"
      />
      {isDesktop ? (
        <VaultCardDropdown
          formattedName={formattedName}
          vault={vault}
          onDelete={modal.onOpen}
          onActivate={onActivate}
          onEdit={onEdit}
          isActive={isActive}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      ) : (
        <VaultCardDrawer
          formattedName={formattedName}
          vault={vault}
          onDelete={modal.onOpen}
          onActivate={onActivate}
          onEdit={onEdit}
          isActive={isActive}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      )}
    </>
  )
}

export default VaultCardMenu
