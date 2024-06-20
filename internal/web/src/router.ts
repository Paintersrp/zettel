import { rootRoute } from "@/routes"

import { appLayout } from "@/routes/app"
import { accountLayout, accountRedirectRoute } from "@/routes/app/account"
import { keysRoute } from "@/routes/app/account/keys"
import { passwordRoute } from "@/routes/app/account/password"
import { profileRoute } from "@/routes/app/account/profile"
import { providersRoute } from "@/routes/app/account/providers"
import { notesRoute } from "@/routes/app/notes"
import { noteCreateRoute } from "@/routes/app/notes/create"
import { noteRoute } from "@/routes/app/notes/note"
import { noteEditRoute } from "@/routes/app/notes/note/edit"
import { notesTableRoute } from "@/routes/app/notes/table"
import { publicRoute } from "@/routes/app/public"
import { sourcesRoute } from "@/routes/app/sources"
import { vaultsRoute } from "@/routes/app/vaults"
import { verifyRoute } from "@/routes/app/verify"
import { authLayout } from "@/routes/auth"
import { loginRoute } from "@/routes/auth/login"
import { registerRoute } from "@/routes/auth/register"
import { webLayout } from "@/routes/web"
import { homeRoute } from "@/routes/web/home"

export const routeTree = rootRoute.addChildren([
  appLayout.addChildren([
    accountLayout.addChildren([
      accountRedirectRoute,
      keysRoute,
      profileRoute,
      passwordRoute,
      providersRoute,
    ]),

    notesRoute.addChildren([
      notesTableRoute,
      noteCreateRoute,
      noteRoute.addChildren([noteEditRoute]),
    ]),

    vaultsRoute,
    sourcesRoute,
    publicRoute,
    verifyRoute,
  ]),

  webLayout.addChildren([homeRoute]),
  authLayout.addChildren([loginRoute, registerRoute]),
])
