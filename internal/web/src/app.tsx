import { RouterProvider } from "@tanstack/react-router"

import { useAuth } from "@/components/providers/AuthProvider"

import { createRouter } from "./router"

const router = createRouter()

const App = () => {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ user: auth.user }} />
}

export default App
