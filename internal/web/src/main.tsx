import React from "react"
import { routeTree } from "@/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter } from "@tanstack/react-router"
import ReactDOM from "react-dom/client"

import type { NoteWithDetails } from "@/types/app"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { Loading } from "@/components/Loading"
import { AuthProvider } from "@/components/providers/auth"

import App from "./app"

const queryClient = new QueryClient()

const router = createRouter({
  routeTree: routeTree,
  defaultPendingComponent: () => (
    <div className="flex-grow">
      <Loading />
    </div>
  ),
  context: {
    head: "",
    queryClient,
    user: null!,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})

const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider delayDuration={100}>
            <App router={router} />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  )
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
