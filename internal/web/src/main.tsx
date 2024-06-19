import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"

import { CatchBoundary } from "./components/CatchBoundary"
import { Loading } from "./components/Loading"
import NotFound from "./components/NotFound"
import { AuthProvider, useAuth } from "./components/providers/AuthProvider"
import { Toaster } from "./components/ui/Sonner"
import { TooltipProvider } from "./components/ui/Tooltip"
import { routeTree } from "./router"
import { NoteWithDetails, User } from "./types/app"

const queryClient = new QueryClient()

const router = createRouter({
  routeTree: routeTree,
  defaultPendingComponent: () => (
    <div className="flex-grow">
      <Loading />
    </div>
  ),
  defaultErrorComponent: CatchBoundary,
  defaultNotFoundComponent: () => <NotFound />,
  context: {
    head: "",
    queryClient,
    user: null!,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})

const App = () => {
  const auth = useAuth()

  return (
    <RouterProvider router={router} context={{ user: auth.user ?? null }} />
  )
}

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider delayDuration={100}>
            <Toaster />
            <App />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

export type RouterContext = {
  head: string
  queryClient: QueryClient
  user: User | null
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
