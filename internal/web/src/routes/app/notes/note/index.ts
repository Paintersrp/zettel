import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { capFirst } from "@/lib/utils"
import { appLayout } from "@/routes/app"

export const noteRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "notes/$id",
  component: lazyRouteComponent(() => import("./Note")),
  beforeLoad: ({ location, params }) => {
    const title = location.state.note
      ? `${capFirst(location.state.note.title)} - Note - Zethub`
      : "Note - Zethub"

    return {
      getSeo: () => {
        return {
          title,
          description: `Zethub note page for user note with id: ${params.id}`,
        }
      },
    }
  },
})
