import { Outlet } from "@tanstack/react-router"

import { nullLazy } from "@/lib/lazy"
import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"

import { AppHeader } from "@/features/app/layout/components/AppHeader"
import { DesktopSidebar } from "@/features/app/layout/components/DesktopSidebar"
import { OnboardingBanner } from "@/features/app/layout/components/OnboardingBanner"
import { useAuth } from "@/features/auth/providers"

const QuickAccess = nullLazy(() =>
  import("@/features/app/layout/components/QuickAccess").then((module) => ({
    default: module.QuickAccess,
  }))
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
  const isOnboarding = user?.onboarding && user?.onboarding_from !== "local"

  return (
    <div
      className={cn(
        "min-h-screen w-full antialiased text-default bg-background tracking-tight flex flex-col",
        theme
      )}
    >
      <DesktopSidebar />
      <div className="flex flex-col w-full sm:gap-4 min-h-full sm:pl-14">
        {isOnboarding && <OnboardingBanner />}
        <AppHeader />
        <main className="px-2 sm:px-8 h-full mb-[56px] flex w-full">
          <Outlet />
        </main>
      </div>

      <QuickAccess />
      <VaultCreateModal />
      <VaultUpdateModal />
      <ScrollToTop />
    </div>
  )
}

export default AppLayout