import { Outlet } from "@tanstack/react-router"

import { ScrollToTop } from "@/components/ScrollToTop"
import { WebFooter } from "@/features/web/layout/components/WebFooter"
import { WebHeader } from "@/features/web/layout/components/WebHeader"

const WebLayout = () => {
  return (
    <div className="min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
      <WebHeader />
      <main className="container px-4 sm:px-8 flex-grow flex">
        <Outlet />
      </main>
      <WebFooter />
      <ScrollToTop />
    </div>
  )
}

export default WebLayout
