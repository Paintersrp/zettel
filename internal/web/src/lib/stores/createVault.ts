import { create } from "zustand"

interface CreateVaultStore {
  open: boolean
  setOpen: (open: boolean) => void
  handleOpen: () => void
  handleClose: () => void
}

const useCreateVault = create<CreateVaultStore>((set) => ({
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

export { useCreateVault }
