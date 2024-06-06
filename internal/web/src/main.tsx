import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ReactDOM from "react-dom/client"

import App from "./app"
import { AuthProvider } from "./components/providers/AuthProvider"
import { Toaster } from "./components/ui/Sonner"
import { TooltipProvider } from "./components/ui/Tooltip"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
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
