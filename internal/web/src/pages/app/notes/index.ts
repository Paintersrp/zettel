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
import { appLayout } from "@/pages/app"

export const notesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes",
  component: lazyRouteComponent(() => import("./Notes")),
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
        // TODO: Vault Select?
        throw redirect({
          to: "/vault/create",
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
        opts.context.user!.active_vault!.id!,
        1,
        opts.deps.filter
      )
    ),
})
