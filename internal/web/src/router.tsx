import { QueryClient } from "@tanstack/react-query"
import {
  createRouter as createReactRouter,
  ErrorComponent,
} from "@tanstack/react-router"

import { NoteWithDetails, User } from "@/types/app"
import { Loading } from "@/components/Loading"
import { keysRoute } from "@/pages/account/keys/Keys"
import { profileRoute } from "@/pages/account/profile/Profile"
import { homeRoute } from "@/pages/home/Home"
import { loginRoute } from "@/pages/login/Login"
import { noteRoute } from "@/pages/note/Note"
import { registerRoute } from "@/pages/register/Register"
import { vaultRoute } from "@/pages/vault/Vault"
import { verifyRoute } from "@/pages/verify/Verify"
import { accountLayout } from "@/layouts/account/Account"
import { authLayout } from "@/layouts/auth/Auth"

import { rootRoute } from "./root"

const queryClient = new QueryClient()

const routeTree = rootRoute.addChildren([
  authLayout,
  accountLayout,
  loginRoute,
  registerRoute,
  noteRoute,
  vaultRoute,
  homeRoute,
  profileRoute,
  keysRoute,
  verifyRoute,
])

export function createRouter() {
  return createReactRouter({
    routeTree: routeTree,
    defaultPendingComponent: () => (
      <div className="flex-grow">
        <Loading />
      </div>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    context: {
      head: "",
      queryClient,
      user: undefined!,
    },
    defaultPreload: "intent",
  })
}

export type RouterContext = {
  head: string
  queryClient: QueryClient
  user: User | undefined
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
