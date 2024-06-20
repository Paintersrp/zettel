import { create } from "zustand"

interface VaultCreateModalStore {
  open: boolean
  setOpen: (open: boolean) => void
  handleOpen: () => void
  handleClose: () => void
}

const useVaultCreateModal = create<VaultCreateModalStore>((set) => ({
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
}))

export { useVaultCreateModal }
