import { StrictMode } from "react"
import { routeTree } from "@/router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRouter } from "@tanstack/react-router"
import { createRoot } from "react-dom/client"

import { defaultQueryConfig } from "@/lib/client"
import type { NoteWithDetails } from "@/types/app"

import { Loading } from "@/components/Loading"
import { AuthProvider } from "@/features/auth/providers"

import App from "./app"

const queryClient = new QueryClient({
  defaultOptions: defaultQueryConfig,
})

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
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
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
