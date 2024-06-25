import { create } from "zustand"

export interface QuickAccessStore {
  open: boolean
  setOpen: (open: boolean) => void
}

const useQuickAccess = create<QuickAccessStore>((set) => ({
  open: false,
  setOpen: (open) => {
    set({ open })
  },
}))

export { useQuickAccess }
