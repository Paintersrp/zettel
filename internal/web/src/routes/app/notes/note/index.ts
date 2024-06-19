import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const noteRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "notes/$id",
  component: lazyRouteComponent(() => import("./Note")),
})
