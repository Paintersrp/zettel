import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { NotesFilterSchema } from "@/features/app/notes/validators"
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
  validateSearch: NotesFilterSchema,
})
