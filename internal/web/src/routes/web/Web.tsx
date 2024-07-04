import { Outlet } from "@tanstack/react-router"

import { ScrollToTop } from "@/components/ScrollToTop"
import { WebFooter } from "@/features/web/layout/components/WebFooter"
import { WebHeader } from "@/features/web/layout/components/WebHeader"

// 6.08kb 7/04/24
// 3.25kb 7/04/24 - Lazy Loading WebDrawer in WebHeader

const WebLayout = () => {
  return (
    <div className="h-full antialiased text-default bg-accent tracking-tight flex flex-col">
      <WebHeader />
      <main className="container px-4 sm:px-8 flex-grow flex bg-accent">
        <Outlet />
      </main>
      <WebFooter />
      <ScrollToTop />
    </div>
  )
}

export default WebLayout
