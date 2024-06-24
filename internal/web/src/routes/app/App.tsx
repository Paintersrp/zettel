import { Outlet } from "@tanstack/react-router"

import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/providers/auth"
import { ScrollToTop } from "@/components/ScrollToTop"

import { DesktopSidebar } from "./DesktopSidebar"
import { Header } from "./Header"
import { OnboardingBanner } from "./OnboardingBanner"
import { QuickAccess } from "./QuickAccess"
import { VaultCreateModal } from "./VaultCreateModal"
import { VaultUpdateModal } from "./VaultUpdateModal"

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  const { user } = useAuth()
  const { theme } = useTheme()
  const isOnboarding = user?.onboarding && user?.onboarding_from !== "local"

  return (
    <div
      className={cn(
        "min-h-screen w-full antialiased text-default bg-page tracking-tight flex flex-col",
        theme
      )}
    >
      <DesktopSidebar />
      <div className="flex flex-col w-full sm:gap-4 min-h-full sm:pl-14">
        {isOnboarding && <OnboardingBanner />}
        <Header />
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
