import { Outlet, ScrollRestoration } from "@tanstack/react-router"

import { SEO } from "@/components/SEO"

// import "@/app.css"

// const ReactQueryDevtools = nullLazy(() =>
//   import("@tanstack/react-query-devtools").then((module) => ({
//     default: module.ReactQueryDevtools,
//   }))
// )
//
// const TanStackRouterDevtools = nullLazy(() =>
//   import("@tanstack/router-devtools").then((module) => ({
//     default: module.TanStackRouterDevtools,
//   }))
// )

const Root = () => {
  return (
    <>
      <SEO />
      <ScrollRestoration />
      <Outlet />

      {/* <TanStackRouterDevtools position="bottom-left" /> */}
      {/* <ReactQueryDevtools buttonPosition="bottom-left" /> */}
    </>
  )
}

export default Root
