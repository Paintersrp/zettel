import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { getNotesInfQueryOptions } from "@/features/app/notes/api/getNotesInf"
import { appLayout } from "@/routes/app"

export const notesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/",
  component: lazyRouteComponent(() => import("./Notes")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Notes - Zethub",
        description: "Zethub user notes dashboard page.",
      }
    },
  }),
  validateSearch: (search: { filter?: string }) => {
    return { filter: search.filter ?? "all" }
  },
  loaderDeps: ({ search }) => ({ ...search }),
  loader: (opts) =>
    opts.context.queryClient.prefetchInfiniteQuery(
      getNotesInfQueryOptions({
        id: opts.context.user!.active_vault!.id!,
        filter: opts.deps.filter,
        max: 10,
      })
    ),
})
