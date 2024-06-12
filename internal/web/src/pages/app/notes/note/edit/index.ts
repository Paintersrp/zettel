import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/pages/app"

export const noteEditRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "notes/$id/edit",
  component: lazyRouteComponent(() => import("./NoteEdit")),
})
