import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

import { Banner } from "@/components/OnboardingBanner"
import { useAuth } from "@/components/providers/AuthProvider"

import Footer from "./Footer"
import Header from "./Header"
import ScrollToTop from "./ScrollToTop"

export const baseLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "base-layout",
  component: () => <BaseLayout />,
})

interface BaseLayoutProps {}

const BaseLayout: React.FC<BaseLayoutProps> = () => {
  const { user } = useAuth()
  return (
    <div className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      <Header />
      {user?.onboarding && user?.onboarding_from !== "local" && <Banner />}
      <main className="container px-4 sm:px-8 flex-grow flex">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default BaseLayout
