import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

import ScrollToTop from "@/components/ScrollToTop"

import DesktopSidebar from "./DesktopSidebar"
import Footer from "./Footer"
import Header from "./Header"

export const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: () => <AppLayout />,
})

interface AppLayoutProps {}

const AppLayout: React.FC<AppLayoutProps> = () => {
  return (
    <div className="dark min-h-screen w-full antialiased text-default bg-page tracking-tight flex flex-col">
      <DesktopSidebar />
      <div className="flex flex-col w-full sm:gap-4 min-h-full sm:py-4 sm:pl-14">
        <Header />
        <main className="px-4 sm:px-8 flex-grow flex w-full">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </div>
  )
}

export default AppLayout
