import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import {
  NotesSearch,
  NotesSearchFilterOptions,
  vaultQueryOptions,
} from "@/lib/queries/vault"
import { appLayout } from "@/routes/app"

export const notesTableRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/table",
  component: lazyRouteComponent(() => import("./NotesTable")),
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
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
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      vaultQueryOptions(
        "table",
        opts.context.user!.active_vault!.id!,
        0,
        0,
        opts.deps.filter
      )
    ),
})
