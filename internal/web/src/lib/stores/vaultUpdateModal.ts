import { create } from "zustand"

import { Vault } from "@/types/app"

interface VaultUpdateModalStore {
  open: boolean
  setOpen: (open: boolean) => void
  handleOpen: () => void
  handleClose: () => void
  selectedVault: Vault | null
  setSelectedVault: (vault: Vault | null) => void
}

const useVaultUpdateModal = create<VaultUpdateModalStore>((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open })
  },
  handleOpen: () => {
    set({ open: true })
  },
  handleClose: () => {
    set({ open: false })
  },
  selectedVault: null,
  setSelectedVault: (vault: Vault | null) => {
    set({ selectedVault: vault })
  },
}))

export { useVaultUpdateModal }
