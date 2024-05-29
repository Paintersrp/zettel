import { createRouter as createReactRouter } from "@tanstack/react-router"

import { NoteWithDetails } from "@/types/app"
import { homeRoute } from "@/pages/home/Home"
import { loginRoute } from "@/pages/login/Login"
import { noteRoute } from "@/pages/note/Note"
import { registerRoute } from "@/pages/register/Register"
import { rootRoute } from "@/pages/root/Root"
import { vaultRoute } from "@/pages/vault/Vault"
import { authRoute } from "@/layouts/auth/Auth"

const routeTree = rootRoute.addChildren([
  authRoute,
  loginRoute,
  registerRoute,
  noteRoute,
  vaultRoute,
  homeRoute,
])

export function createRouter() {
  return createReactRouter({
    routeTree: routeTree,
    context: {
      head: "",
    },
    defaultPreload: "intent",
  })
}

export type RouterContext = {
  head: string
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
