import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { capFirst } from "@/lib/utils"
import { appLayout } from "@/routes/app"

export const noteEditRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "notes/$id/edit",
  component: lazyRouteComponent(() => import("./NoteEdit")),
  beforeLoad: ({ location, params }) => {
    const title = location.state.note
      ? `${capFirst(location.state.note.title)} - Note Edit - Zethub`
      : "Note Edit - Zethub"

    return {
      getSeo: () => {
        return {
          title,
          description: `Zethub note edit page for user note with id: ${params.id}`,
        }
      },
    }
  },
})
