import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import { SidePanelContentType } from "@/features/app/layout/components/SidePanelContent"

interface SidePanel {
  isOpen: boolean
  contentType: SidePanelContentType
  contentKey: string | null
  contentProps: Record<string, any>
  history: {
    type: SidePanelContentType
    key: string | null
    props: Record<string, any>
  }[]
}

interface SidePanelState {
  sidePanel: SidePanel
  setSidePanel: (state: Partial<SidePanel>) => void
  openPanel: (
    contentType: SidePanelContentType,
    contentKey: string,
    props?: Record<string, any>
  ) => void
  togglePanel: () => void
  closePanel: () => void
  goBack: () => void
}

export const useSidePanel = create<SidePanelState>()(
  persist(
    (set) => ({
      sidePanel: {
        isOpen: false,
        contentType: null,
        contentKey: null,
        contentProps: {},
        history: [],
      },
      setSidePanel: (state) =>
        set((prev) => ({ sidePanel: { ...prev.sidePanel, ...state } })),
      openPanel: (contentType, contentKey, props = {}) =>
        set((prev) => ({
          sidePanel: {
            ...prev.sidePanel,
            isOpen: true,
            contentType,
            contentKey,
            contentProps: props,
            history: [
              ...prev.sidePanel.history,
              {
                type: prev.sidePanel.contentType,
                key: prev.sidePanel.contentKey,
                props: prev.sidePanel.contentProps,
              },
            ].slice(-10), // Keep last 10 items in history
          },
        })),
      togglePanel: () =>
        set((prev) => ({
          sidePanel: {
            ...prev.sidePanel,
            isOpen: !prev.sidePanel.isOpen,
          },
        })),
      closePanel: () =>
        set((prev) => ({
          sidePanel: {
            ...prev.sidePanel,
            isOpen: false,
            contentType: null,
            contentKey: null,
            contentProps: {},
          },
        })),
      goBack: () =>
        set((prev) => {
          const lastItem = prev.sidePanel.history.pop()
          return lastItem
            ? {
                sidePanel: {
                  ...prev.sidePanel,
                  contentType: lastItem.type,
                  contentKey: lastItem.key,
                  contentProps: lastItem.props,
                  history: prev.sidePanel.history,
                },
              }
            : prev
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ sidePanel: state.sidePanel }),
    }
  )
)
