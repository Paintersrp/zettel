import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { getNotesQueryOptions } from "@/features/app/notes-table/api/getNotes"
import { NotesFilterSchema } from "@/features/app/notes/validators"
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
  validateSearch: NotesFilterSchema,
  loaderDeps: ({ search: { filter } }) => ({ filter }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getNotesQueryOptions(
        "table",
        opts.context.user!.active_vault!.id!,
        0,
        0,
        opts.deps.filter
      )
    ),
})
