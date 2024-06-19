import { Outlet } from "@tanstack/react-router"

import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"
import CreateVault from "@/components/CreateVault"
import { useAuth } from "@/components/providers/AuthProvider"
import QuickAccess from "@/components/QuickAccess"
import ScrollToTop from "@/components/ScrollToTop"

import DesktopSidebar from "./DesktopSidebar"
import Header from "./Header"
import OnboardingBanner from "./OnboardingBanner"

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  const { user } = useAuth()
  const { theme } = useTheme()

  return (
    <div
      className={cn(
        "min-h-screen w-full antialiased text-default bg-page tracking-tight flex flex-col",
        theme
      )}
    >
      <DesktopSidebar />
      <div className="flex flex-col w-full sm:gap-4 min-h-full sm:pl-14">
        {user?.onboarding && user?.onboarding_from !== "local" && (
          <OnboardingBanner />
        )}
        <CreateVault />
        <QuickAccess />
        <Header />
        <main className="px-2 sm:px-8 h-full mb-[56px] flex w-full">
          <Outlet />
        </main>
        <ScrollToTop />
      </div>
    </div>
  )
}

export default AppLayout
