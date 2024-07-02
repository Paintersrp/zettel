import { Outlet } from "@tanstack/react-router"

import { nullLazy } from "@/lib/lazy"
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
import { SidePanelContent } from "@/features/app/layout/sidepanel/components/SidePanelContent"
import { SidePanelToolbar } from "@/features/app/layout/sidepanel/components/SidePanelToolbar"
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

const AppLayout = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const { currentState } = useSidePanel()
  const isOnboarding = user?.onboarding && user?.onboarding_from !== "local"

  return (
    <div
      className={cn(
        "min-h-full h-full w-full antialiased tracking-tight flex flex-col bg-card",
        theme
      )}
    >
      <DesktopSidebar />

      <div className="flex flex-col w-full sm:pl-12 dynamic-height">
        <AppHeader />
        {isOnboarding && <OnboardingBanner />}

        <div className="flex flex-grow !overflow-visible dynamic-height">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-grow h-screen dynamic-height"
          >
            <ResizablePanel id="main" className="overflow-auto">
              <main className="flex w-full min-h-full">
                <Outlet />
              </main>
            </ResizablePanel>
            <ResizableHandle withHandle={currentState.isOpen} />
            {currentState.isOpen && (
              <ResizablePanel
                id="side-panel"
                className="hidden md:flex flex-col bg-accent"
                defaultSize={20}
              >
                <aside className="w-full min-h-screen h-screen flex flex-col">
                  <SidePanelToolbar />
                  <div className="flex-grow overflow-auto">
                    <SidePanelContent
                      type={currentState.contentType}
                      contentKey={currentState.contentKey}
                      props={currentState.contentProps}
                    />
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
