import { ReactNode } from "react"

import { Authentication } from "@/components/Authentication"

import AppHeader from "./components/AppHeader"
import AppModals from "./components/AppModals"
import AppPanels from "./components/AppPanels"
import DesktopSidebar from "./components/DesktopSidebar"
import OnboardingBanner from "./components/OnboardingBanner"

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Authentication>
      <div className="w-full antialiased tracking-tight flex flex-col bg-card">
        <DesktopSidebar />

        <div className="flex flex-col w-full h-full sm:pl-12">
          <OnboardingBanner />
          <AppHeader />

          <div className="flex flex-grow dynamic-height">
            <AppPanels>{children}</AppPanels>
          </div>
        </div>

        <AppModals />
      </div>
    </Authentication>
  )
}

export default AppLayout
