import { Suspense } from "react"

import ScrollToTop from "@/components/ScrollToTop"

import WebFooter from "./components/WebFooter"
import WebHeader from "./components/WebHeader"

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <div className="h-full antialiased text-default bg-accent tracking-tight flex flex-col">
      <WebHeader />
      <main className="container px-4 sm:px-8 flex-grow flex bg-accent">
        {children}
      </main>
      <WebFooter />
      <Suspense fallback={null}>
        <ScrollToTop />
      </Suspense>
    </div>
  )
}
