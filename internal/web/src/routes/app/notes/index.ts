import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { NotesSearch, NotesSearchFilterOptions } from "@/lib/queries/vault"
import { appLayout } from "@/routes/app"

export const notesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/",
  component: lazyRouteComponent(() => import("./Notes")),
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
        // TODO: Vault Select?
        throw redirect({
          to: "/vaults",
        })
      }
    } else {
      throw redirect({
        to: `/login`,
        search: {
          redirect: location.href,
        },
      })
    }
  },
  validateSearch: (search: Record<string, unknown>): NotesSearch => {
    return {
      filter: (search.filter as NotesSearchFilterOptions) || "all",
    }
  },
})
