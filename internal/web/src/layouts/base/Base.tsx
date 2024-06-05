import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

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
  return (
    <div className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      <Header />
      <main className="container px-4 sm:px-8 flex-grow flex">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default BaseLayout
