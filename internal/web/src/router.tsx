import { QueryClient } from "@tanstack/react-query"
import {
  createRouter as createReactRouter,
  ErrorComponent,
} from "@tanstack/react-router"

import { NoteWithDetails, User } from "@/types/app"
import { Loading } from "@/components/Loading"
import { appLayout } from "@/pages/app"
import { accountLayout } from "@/pages/app/account"
import { keysRoute } from "@/pages/app/account/keys"
import { passwordRoute } from "@/pages/app/account/password"
import { profileRoute } from "@/pages/app/account/profile"
import { providersRoute } from "@/pages/app/account/providers"
import { notesRoute } from "@/pages/app/notes"
import { noteCreateRoute } from "@/pages/app/notes/create"
import { noteRoute } from "@/pages/app/notes/note"
import { noteEditRoute } from "@/pages/app/notes/note/edit"
import { notesTableRoute } from "@/pages/app/notes/table"
import { publicRoute } from "@/pages/app/public"
import { sourcesRoute } from "@/pages/app/sources"
import { vaultsRoute } from "@/pages/app/vaults"
import { verifyRoute } from "@/pages/app/verify"
import { authLayout } from "@/pages/auth"
import { loginRoute } from "@/pages/auth/login"
import { registerRoute } from "@/pages/auth/register"
import { webLayout } from "@/pages/web"
import { homeRoute } from "@/pages/web/home"

import NotFound from "./components/NotFound"
import { rootRoute } from "./root"

const queryClient = new QueryClient()

const routeTree = rootRoute.addChildren([
  appLayout.addChildren([
    noteRoute,
    noteCreateRoute,
    noteEditRoute,
    notesRoute,
    notesTableRoute,
    vaultsRoute,
    sourcesRoute,
    publicRoute,
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
    defaultNotFoundComponent: () => <NotFound />,
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
