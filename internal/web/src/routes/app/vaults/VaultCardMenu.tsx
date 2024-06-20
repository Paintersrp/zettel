import type { FC } from "react"

import type { Vault } from "@/types/app"
import { useDeleteMutation } from "@/lib/mutations/delete"
import { useConfirmationModal } from "@/hooks/useConfirmationModal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useReactiveOpen } from "@/hooks/useReactiveOpen"
import { ConfirmationModal } from "@/components/ConfirmationModal"

import VaultCardDrawer from "./VaultCardDrawer"
import VaultCardDropdown from "./VaultCardDropdown"

interface VaultCardMenuProps {
  vault: Vault
  isActive: boolean
}

const VaultCardMenu: FC<VaultCardMenuProps> = ({ vault, isActive }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const menu = useReactiveOpen()
  const modal = useConfirmationModal()
  const deleteMutation = useDeleteMutation({ id: vault.id, type: "vaults" })

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
          isActive={isActive}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      ) : (
        <VaultCardDrawer
          vault={vault}
          onDelete={modal.onOpen}
          isActive={isActive}
          open={menu.open}
          setOpen={menu.setOpen}
        />
      )}
    </>
  )
}

export default VaultCardMenu
