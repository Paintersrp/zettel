import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export type SidePanelContentType =
  | "preview"
  | "notes"
  | "search"
  | "scratchpad"
  | "history"
  | "note-information"
  | null

export interface PanelState {
  isOpen: boolean
  contentType: SidePanelContentType
  contentKey: string | null
  contentProps: Record<string, unknown>
}

interface SidePanelStore {
  currentState: PanelState
  history: PanelState[]
  currentIndex: number
  setPanel: (state: Partial<PanelState>) => void
  openPanel: (
    contentType: SidePanelContentType,
    contentKey: string,
    props?: Record<string, unknown>
  ) => void
  togglePanel: () => void
  closePanel: () => void
  navigateHistory: (index: number) => void
  removeFromHistory: (index: number) => void
  clearHistory: () => void
  undo: () => void
  redo: () => void
}

const MAX_HISTORY_LENGTH = 25

const initialState: PanelState = {
  isOpen: false,
  contentType: null,
  contentKey: null,
  contentProps: {},
}

// TODO: on undo/redo, if in history it should go to currIndex not prev since history is ignored

export const useSidePanel = create<SidePanelStore>()(
  persist(
    (set) => ({
      currentState: initialState,
      history: [],
      currentIndex: -1,
      setPanel: (newState) =>
        set((prev) => {
          const updatedPanel = { ...prev.currentState, ...newState }
          if (updatedPanel.contentType !== "history") {
            const newHistory = [
              updatedPanel,
              ...prev.history.slice(prev.currentIndex + 1),
            ].slice(0, MAX_HISTORY_LENGTH)
            return {
              currentState: updatedPanel,
              history: newHistory,
              currentIndex: 0,
            }
          }
          return { currentState: updatedPanel }
        }),
      openPanel: (contentType, contentKey, props = {}) =>
        set((prev) => {
          const newPanel: PanelState = {
            isOpen: true,
            contentType,
            contentKey,
            contentProps: props,
          }
          if (contentType !== "history") {
            const newHistory = [newPanel, ...prev.history].slice(
              0,
              MAX_HISTORY_LENGTH
            )
            return {
              currentState: newPanel,
              history: newHistory,
              currentIndex: 0,
            }
          }
          return { currentState: newPanel }
        }),
      togglePanel: () =>
        set((prev) => ({
          currentState: {
            ...prev.currentState,
            isOpen: !prev.currentState.isOpen,
          },
        })),
      closePanel: () => set({ currentState: initialState, currentIndex: -1 }),
      navigateHistory: (index) =>
        set((prev) => {
          const selectedItem = prev.history[index]
          const newHistory = [
            selectedItem,
            ...prev.history.slice(0, index),
            ...prev.history.slice(index + 1),
          ].slice(0, MAX_HISTORY_LENGTH)
          return {
            currentState: selectedItem,
            history: newHistory,
            currentIndex: 0,
          }
        }),
      removeFromHistory: (index) =>
        set((prev) => {
          const newHistory = prev.history.filter((_, i) => i !== index)
          const newIndex =
            prev.currentIndex >= index
              ? prev.currentIndex - 1
              : prev.currentIndex
          return {
            history: newHistory,
            currentIndex: Math.max(
              -1,
              Math.min(newIndex, newHistory.length - 1)
            ),
            currentState: prev.currentState,
          }
        }),
      clearHistory: () =>
        set({
          history: [],
          currentIndex: -1,
          currentState: { ...initialState, isOpen: true },
        }),
      undo: () =>
        set((prev) => {
          if (prev.currentIndex > 0) {
            const newIndex = prev.currentIndex - 1
            return {
              currentState: prev.history[newIndex],
              currentIndex: newIndex,
            }
          }
          return {}
        }),
      redo: () =>
        set((prev) => {
          if (prev.currentIndex < prev.history.length - 1) {
            const newIndex = prev.currentIndex + 1
            return {
              currentState: prev.history[newIndex],
              currentIndex: newIndex,
            }
          }
          return {}
        }),
    }),
    {
      name: "side-panel-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        currentState: state.currentState,
        history: state.history,
        currentIndex: state.currentIndex,
      }),
    }
  )
)
