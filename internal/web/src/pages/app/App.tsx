import { Outlet } from "@tanstack/react-router"

import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/providers/AuthProvider"
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
        <Header />
        <main className="px-4 sm:px-8 flex-grow flex w-full">
          <Outlet />
        </main>
        {/* <Footer /> */}
        <ScrollToTop />
      </div>
    </div>
  )
}

export default AppLayout
