import { QueryClient } from "@tanstack/react-query"
import {
  createRouter as createReactRouter,
  ErrorComponent,
} from "@tanstack/react-router"

import { NoteWithDetails } from "@/types/app"
import { Loading } from "@/components/Loading"
import { homeRoute } from "@/pages/home/Home"
import { loginRoute } from "@/pages/login/Login"
import { noteRoute } from "@/pages/note/Note"
import { registerRoute } from "@/pages/register/Register"
import { rootRoute } from "@/pages/root/Root"
import { vaultRoute } from "@/pages/vault/Vault"
import { authRoute } from "@/layouts/auth/Auth"
import BaseLayout from "@/layouts/base/Base"

const queryClient = new QueryClient()

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
    defaultPendingComponent: () => (
      <BaseLayout>
        <Loading />
      </BaseLayout>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    context: {
      head: "",
      queryClient,
    },
    defaultPreload: "intent",
  })
}

export type RouterContext = {
  head: string
  queryClient: QueryClient
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
