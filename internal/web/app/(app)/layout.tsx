import { ReactNode, Suspense } from "react"

import { Authentication } from "@/components/Authentication"
import ScrollToTop from "@/components/ScrollToTop"

import AppHeader from "./components/AppHeader"
import AppPanels from "./components/AppPanels"
import DesktopSidebar from "./components/DesktopSidebar"
import OnboardingBanner from "./components/OnboardingBanner"
import QuickAccessModal from "./components/QuickAccessModal"
import VaultCreateModal from "./components/VaultCreateModal"
import VaultUpdateModal from "./components/VaultUpdateModal"

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Authentication>
      <div className="w-full antialiased tracking-tight flex flex-col bg-card">
        <DesktopSidebar />

        <div className="flex flex-col w-full h-full sm:pl-12">
          <Suspense fallback={null}>
            <OnboardingBanner />
          </Suspense>
          <AppHeader />

          <div className="flex flex-grow dynamic-height">
            <AppPanels>{children}</AppPanels>
          </div>
        </div>

        <Suspense fallback={null}>
          <QuickAccessModal />
          <VaultCreateModal />
          <VaultUpdateModal />
          <ScrollToTop />
        </Suspense>
      </div>
    </Authentication>
  )
}

export default AppLayout
