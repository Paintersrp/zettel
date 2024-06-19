import { useCallback, useState, type FC } from "react"

import { Vault } from "@/types/app"
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
  const { open, setOpen } = useReactiveOpen()
  const { open: confirmOpen, setOpen: setConfirmOpen } = useReactiveOpen()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)
    console.log("Delete click")
    setIsLoading(false)
  }, [])

  const onConfirmOpen = useCallback(() => {
    setConfirmOpen(true)
  }, [])

  const onConfirmClose = useCallback(() => {
    setConfirmOpen(false)
  }, [])

  return (
    <>
      <ConfirmationModal
        open={confirmOpen}
        onClose={onConfirmClose}
        isLoading={isLoading}
        onConfirm={onDelete}
        title="Are you sure you want to delete this vault?"
      />
      {isDesktop ? (
        <VaultCardDropdown
          vault={vault}
          onDelete={onConfirmOpen}
          isActive={isActive}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <VaultCardDrawer
          vault={vault}
          onDelete={onConfirmOpen}
          isActive={isActive}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  )
}

export default VaultCardMenu
