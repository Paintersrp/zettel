import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { getNotesOptions } from "@/features/app/notes-table/api/getNotes"
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
  loaderDeps: ({ search }) => ({ ...search }),
  loader: (opts) =>
    opts.context.queryClient.ensureQueryData(
      getNotesOptions({
        key: "table",
        id: opts.context.user!.active_vault!.id!,
        page: 0,
        max: 0,
        filter: opts.deps.filter,
      })
    ),
})
