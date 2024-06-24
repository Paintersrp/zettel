import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Outlet, ScrollRestoration } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import "@/app.css"

import { useSeo } from "@/hooks/useSeo"
import { Toaster } from "@/components/ui/Sonner"

const Root = () => {
  useSeo()

  return (
    <>
      <Toaster />
      <ScrollRestoration />
      <Outlet />
      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
}

export default Root
