import { Outlet } from "@tanstack/react-router"

import { loadingLazy, nullLazy } from "@/lib/lazy"
import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"
import { AppHeader } from "@/features/app/layout/components/AppHeader"
import { DesktopSidebar } from "@/features/app/layout/components/DesktopSidebar"
import { OnboardingBanner } from "@/features/app/layout/components/OnboardingBanner"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"
import { useAuth } from "@/features/auth/providers"

const QuickAccessModal = nullLazy(() =>
  import("@/features/app/layout/components/QuickAccessModal").then(
    (module) => ({
      default: module.QuickAccessModal,
    })
  )
)
const VaultCreateModal = nullLazy(() =>
  import("@/features/app/vaults/components/VaultCreateModal").then(
    (module) => ({
      default: module.VaultCreateModal,
    })
  )
)
const VaultUpdateModal = nullLazy(() =>
  import("@/features/app/vaults/components/VaultUpdateModal").then(
    (module) => ({
      default: module.VaultUpdateModal,
    })
  )
)
const ScrollToTop = nullLazy(() =>
  import("@/components/ScrollToTop").then((module) => ({
    default: module.ScrollToTop,
  }))
)
const SidePanelToolbar = nullLazy(() =>
  import("@/features/app/layout/sidepanel/components/SidePanelToolbar").then(
    (module) => ({
      default: module.SidePanelToolbar,
    })
  )
)
const SidePanelContent = loadingLazy(() =>
  import("@/features/app/layout/sidepanel/components/SidePanelContent").then(
    (module) => ({
      default: module.SidePanelContent,
    })
  )
)

// 89.84kb 7/04/24
// 69.47kb 7/05/24 - Lazy Loading SidePanelToolbar, SidePanelContent
// Could get lower, but realistically we need the ResizablePanels to be loaded in the initial bundle
// Look to the AppHeader and DesktopSidebar for lazy loading opportunities

const AppLayout = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { currentState } = useSidePanel()
  const isOnboarding = user?.onboarding && user?.onboarding_from !== "local"

  return (
    <div
      className={cn(
        "min-h-full h-full w-full antialiased tracking-tight flex flex-col bg-accent",
        theme
      )}
    >
      <DesktopSidebar />

      <div className="flex flex-col w-full sm:pl-12">
        {isOnboarding && <OnboardingBanner />}
        <AppHeader />

        <div className="flex flex-grow !overflow-visible dynamic-height">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-grow h-screen"
          >
            <ResizablePanel
              id="main"
              order={1}
              defaultSize={67}
              className="flex flex-col w-full"
            >
              <main className="flex w-full h-full min-h-full">
                <Outlet />
              </main>
            </ResizablePanel>
            <ResizableHandle withHandle={currentState.isOpen} />
            {currentState.isOpen && (
              <ResizablePanel
                id="side-panel"
                order={2}
                className="hidden md:flex flex-col bg-accent"
                defaultSize={33}
                maxSize={50}
              >
                <aside className="w-full min-h-screen h-screen flex flex-col">
                  <SidePanelToolbar />
                  <div className="flex-grow overflow-auto">
                    <SidePanelContent />
                  </div>
                </aside>
              </ResizablePanel>
            )}
          </ResizablePanelGroup>
        </div>
      </div>

      <QuickAccessModal />
      <VaultCreateModal />
      <VaultUpdateModal />
      <ScrollToTop />
    </div>
  )
}

export default AppLayout
