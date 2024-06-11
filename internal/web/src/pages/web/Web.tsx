import { rootRoute } from "@/root"
import { createRoute, Outlet } from "@tanstack/react-router"

import ScrollToTop from "@/components/ScrollToTop"

import Footer from "./Footer"
import Header from "./Header"

export const webLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "web-layout",
  component: () => <WebLayout />,
})

interface WebLayoutProps {}

const WebLayout: React.FC<WebLayoutProps> = () => {
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

export default WebLayout
