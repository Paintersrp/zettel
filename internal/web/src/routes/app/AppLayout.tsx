import { Outlet } from "@tanstack/react-router"

import { nullLazy } from "@/lib/lazy"
import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"

import { AppHeader } from "@/features/app/layout/components/AppHeader"
import { DesktopSidebar } from "@/features/app/layout/components/DesktopSidebar"
import { OnboardingBanner } from "@/features/app/layout/components/OnboardingBanner"
import { SidePanelContent } from "@/features/app/layout/components/SidePanelContent"
import { SidePanelToolbar } from "@/features/app/layout/components/SidePanelToolbar"
import { useSidePanel } from "@/features/app/layout/stores/sidePanel"
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
  const { sidePanel } = useSidePanel()
  const isOnboarding = user?.onboarding && user?.onboarding_from !== "local"

  return (
    <div
      className={cn(
        "min-h-screen w-full antialiased bg-background tracking-tight flex flex-col",
        theme
      )}
    >
      <DesktopSidebar />
      <div className="flex flex-col w-full min-h-full sm:pl-12">
        <AppHeader />
        {isOnboarding && <OnboardingBanner />}

        <div className="flex flex-grow dynamic-height bg-card">
          <main
            className={cn(
              "mb-[56px] flex",
              sidePanel.isOpen ? "w-2/3" : "w-full"
            )}
          >
            <Outlet />
          </main>
          {sidePanel.isOpen && (
            <aside className="hidden md:flex flex-col w-1/3 border-l h-full bg-accent">
              <SidePanelToolbar />
              <div className="flex-grow">
                <SidePanelContent
                  type={sidePanel.contentType}
                  contentKey={sidePanel.contentKey}
                  props={sidePanel.contentProps}
                />
              </div>
            </aside>
          )}
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
