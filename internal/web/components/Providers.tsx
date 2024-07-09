"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

import { User } from "@/types/app"
import { defaultQueryConfig } from "@/lib/client"
import { TooltipProvider } from "@/components/ui/Tooltip"

import { AuthProvider } from "./auth/provider"
import { Toaster } from "./ui/Sonner"

const Providers = ({
  children,
  user,
  ...props
}: ThemeProviderProps & { user: User | null }) => {
  const queryClient = new QueryClient({ defaultOptions: defaultQueryConfig })

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
