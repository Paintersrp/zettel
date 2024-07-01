import type { FC } from "react"
import { createRouter, RouterProvider } from "@tanstack/react-router"

import { useAuth } from "@/features/auth/providers"

interface AppProps {
  router: ReturnType<typeof createRouter>
}

const App: FC<AppProps> = ({ router }) => {
  const auth = useAuth()

  return (
    <RouterProvider router={router} context={{ user: auth.user ?? null }} />
  )
}

export default App
