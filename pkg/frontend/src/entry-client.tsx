import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StartClient } from "@tanstack/start"
import ReactDOM from "react-dom/client"

import { createRouter } from "./router"

const router = createRouter()

const queryClient = new QueryClient()

ReactDOM.hydrateRoot(
  document,
  <QueryClientProvider client={queryClient}>
    <StartClient router={router} />
  </QueryClientProvider>
)
