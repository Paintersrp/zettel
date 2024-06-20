import type { FC } from "react"
import {
  RouterProvider,
  type AnyRoute,
  type Router,
  type TrailingSlashOption,
} from "@tanstack/react-router"

import { useAuth } from "@/components/providers/auth"

interface AppProps {
  router: Router<
    AnyRoute,
    NonNullable<TrailingSlashOption | undefined>,
    Record<string, unknown>,
    Record<string, unknown>
  >
}

const App: FC<AppProps> = ({ router }) => {
  const auth = useAuth()

  return (
    <RouterProvider router={router} context={{ user: auth.user ?? null }} />
  )
}

export default App
