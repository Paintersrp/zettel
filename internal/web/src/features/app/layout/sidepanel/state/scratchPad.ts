import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ScratchpadState {
  content: string
  savedScratchpads: { id: string; name: string; content: string }[]

  vimEnabled: boolean
  toggleVim: () => void

  saveScratchpad: (name: string) => void
  loadScratchpad: (id: string) => void
  deleteScratchpad: (id: string) => void

  updateContent: (content: string) => void
  clearContent: () => void
}

export const useScratchpadStore = create<ScratchpadState>()(
  persist(
    (set) => ({
      content: "",
      savedScratchpads: [],

      vimEnabled: false,
      toggleVim: () => set((state) => ({ vimEnabled: !state.vimEnabled })),

      saveScratchpad: (name: string) =>
        set((state) => ({
          savedScratchpads: [
            ...state.savedScratchpads,
            { id: Date.now().toString(), name, content: state.content },
          ],
        })),
      loadScratchpad: (id: string) =>
        set((state) => ({
          content:
            state.savedScratchpads.find((s) => s.id === id)?.content || "",
        })),
      deleteScratchpad: (id: string) =>
        set((state) => ({
          savedScratchpads: state.savedScratchpads.filter((s) => s.id !== id),
        })),

      updateContent: (content: string) => set({ content }),
      clearContent: () => set({ content: "" }),
    }),
    {
      name: "scratchpad-storage",
    }
  )
)
