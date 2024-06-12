import { QueryClient } from "@tanstack/react-query"
import {
  createRouter as createReactRouter,
  ErrorComponent,
} from "@tanstack/react-router"

import { NoteWithDetails, User } from "@/types/app"
import { Loading } from "@/components/Loading"
import { accountLayout } from "@/pages/app/account/Account"
import { keysRoute } from "@/pages/app/account/keys/Keys"
import { passwordRoute } from "@/pages/app/account/password/Password"
import { profileRoute } from "@/pages/app/account/profile/Profile"
import { providersRoute } from "@/pages/app/account/providers/Providers"
import { appLayout } from "@/pages/app/App"
import { noteRoute } from "@/pages/app/notes/note/Note"
import { notesRoute } from "@/pages/app/notes/Notes"
import { createVaultRoute } from "@/pages/app/vault/create/CreateVault"
import { vaultRoute } from "@/pages/app/vault/Vault"
import { verifyRoute } from "@/pages/app/verify/Verify"
import { authLayout } from "@/pages/auth/Auth"
import { loginRoute } from "@/pages/auth/login/Login"
import { registerRoute } from "@/pages/auth/register/Register"
import { homeRoute } from "@/pages/web/home/Home"
import { webLayout } from "@/pages/web/Web"

import { notesAltRoute } from "./pages/app/notes/alt/NotesAlt"
import { noteEditRoute } from "./pages/app/notes/note/edit/NoteEdit"
import { rootRoute } from "./root"

const queryClient = new QueryClient()

const routeTree = rootRoute.addChildren([
  appLayout.addChildren([
    noteRoute,
    noteEditRoute,
    notesRoute,
    notesAltRoute,
    vaultRoute,
    createVaultRoute,
    verifyRoute,
    accountLayout.addChildren([
      keysRoute,
      profileRoute,
      passwordRoute,
      providersRoute,
    ]),
  ]),

  webLayout.addChildren([homeRoute]),
  authLayout.addChildren([loginRoute, registerRoute]),
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
      user: null!,
    },
    defaultPreload: "intent",
  })
}

export type RouterContext = {
  head: string
  queryClient: QueryClient
  user: User | null
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
  interface HistoryState {
    note?: NoteWithDetails
  }
}
