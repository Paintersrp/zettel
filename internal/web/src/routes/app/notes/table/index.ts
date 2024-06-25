import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import {
  notesQueryOptions,
  NotesSearch,
  NotesSearchFilterOptions,
} from "@/features/app/notes/api/notes"
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

    return {
      getSeo: () => {
        return {
          title: "Notes Table - Zethub",
          description: "Zethub user notes table page.",
        }
      },
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
      notesQueryOptions(
        "table",
        opts.context.user!.active_vault!.id!,
        0,
        0,
        opts.deps.filter
      )
    ),
})
