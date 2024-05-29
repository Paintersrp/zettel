import { useEffect } from "react"
import { RouterContext } from "@/router"
import { useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  createRootRouteWithContext,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { DehydrateRouter } from "@tanstack/start"
import Cookies from "js-cookie"

import axios from "@/lib/axios"
import { useUserStore } from "@/lib/stores/user"
import { Toaster } from "@/components/ui/Sonner"

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
})

const fetchUser = async () => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    // TODO:
    return { id: 0, username: "" }
  }

  try {
    const { data } = await axios.get("v1/auth/user")

    return data
  } catch (error) {
    // TODO:
    console.error("Error fetching user:", error)
    throw new Error("Network response was not ok")
  }
}

function Root() {
  // TODO: user hook
  const { setUser } = useUserStore()
  const { data: user, error } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
    initialData: {},
  })

  useEffect(() => {
    setUser(user)
  }, [user])

  useEffect(() => {
    if (error) {
      // TODO:
      console.error("Error fetching user:", error)
    }
  }, [error])

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script
            type="module"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `
              import RefreshRuntime from "/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true
            `,
            }}
          />
          <script type="module" src="/@vite/client" />
          <script type="module" src="/src/entry-client.tsx" />
          <link rel="stylesheet" href="/src/app.css" />
          <title>Vite + React + TS</title>
        </head>
        <Toaster />
        <ScrollRestoration />
        <body className="dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col">
          <div
            id="root"
            className="w-full dark min-h-screen antialiased text-default bg-page tracking-tight flex flex-col"
          >
            <Outlet />
          </div>
        </body>
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <DehydrateRouter />
      </html>
    </>
  )
}

export default Root
