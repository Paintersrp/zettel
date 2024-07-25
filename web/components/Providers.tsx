"use client"

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

import { UserSession } from "@/types/app"
import { TooltipProvider } from "@/components/ui/Tooltip"

import { AuthProvider } from "./auth/provider"
import { Toaster } from "./ui/Sonner"

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const Providers = ({
  children,
  user,
  ...props
}: ThemeProviderProps & { user: Promise<UserSession | null> }) => {
  const queryClient = getQueryClient()

  return (
    <ThemeProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider user={user}>
          <TooltipProvider delayDuration={0} skipDelayDuration={500}>
            <Toaster />
            {children}
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export { Providers }
