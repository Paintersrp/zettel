import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

import { useAuth } from "@/components/providers/AuthProvider"
import ScrollToTop from "@/components/ScrollToTop"

import Footer from "./Footer"
import Header from "./Header"
import OnboardingBanner from "./OnboardingBanner"

export const webLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "web-layout",
  component: () => <WebLayout />,
})

interface WebLayoutProps {}

const WebLayout: React.FC<WebLayoutProps> = () => {
  const { user } = useAuth()
  return (
    <div className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      <Header />
      {user?.onboarding && user?.onboarding_from !== "local" && (
        <OnboardingBanner />
      )}
      <main className="container px-4 sm:px-8 flex-grow flex">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default WebLayout
