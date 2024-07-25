import { create } from "zustand"

export interface TitleStore {
  title: string
  setTitle: (title: string) => void
}

const useTitle = create<TitleStore>((set) => ({
  title: "Untitled",
  setTitle: (title) => {
    set({ title })
  },
}))

export { useTitle }
