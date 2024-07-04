import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { getNotesOptions } from "@/features/app/notes-table/api/getNotes"
import { appLayout } from "@/routes/app"

export const notesTableRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/table",
  component: lazyRouteComponent(() => import("./NotesTable")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Notes Table - Zethub",
        description: "Zethub user notes table page.",
      }
    },
  }),
  validateSearch: (search: { filter: string }) => {
    return { filter: search.filter }
  },
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
