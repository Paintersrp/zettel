import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import "./app.css"

import { RouterContext } from "@/router"

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

function Root() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
      {/* <TanStackRouterDevtools position="bottom-left" /> */}
    </>
  )
}

export default Root
