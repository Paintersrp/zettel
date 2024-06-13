import { create } from "zustand"

interface CreateVaultStore {
  open: boolean
  setOpen: (open: boolean) => void
}

const useCreateVault = create<CreateVaultStore>((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open })
  },
}))

export { useCreateVault }
