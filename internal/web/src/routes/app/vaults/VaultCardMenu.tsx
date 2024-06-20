import { useCallback, type FC } from "react"

import type { Vault } from "@/types/app"
import { useDeleteMutation } from "@/lib/mutations/common/delete"
import { useVaultChangeMutation } from "@/lib/mutations/vaults/vaultChange"
import { useVaultUpdateModal } from "@/lib/stores/vaultUpdateModal"
import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { useAuth } from "@/components/providers/auth"

import VaultCardDrawer from "./VaultCardDrawer"
import VaultCardDropdown from "./VaultCardDropdown"

interface VaultCardMenuProps {
  vault: Vault
  isActive: boolean
}

const VaultCardMenu: FC<VaultCardMenuProps> = ({ vault, isActive }) => {
  const { user } = useAuth()
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmationModal()
  const updateModal = useVaultUpdateModal()
  const deleteMutation = useDeleteMutation({ id: vault.id, type: "vaults" })
  const changeMutation = useVaultChangeMutation()

  const onEdit = useCallback(() => {
    menu.setOpen(false)
    updateModal.setSelectedVault(vault)
    updateModal.setOpen(true)
  }, [menu, updateModal, vault])

  const onActivate = useCallback(() => {
    changeMutation.mutate({ userId: user!.id, vaultId: vault.id })
  }, [vault, changeMutation, user])

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
