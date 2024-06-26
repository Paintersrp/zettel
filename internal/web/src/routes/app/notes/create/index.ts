import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const noteCreateRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/create",
  component: lazyRouteComponent(() => import("./CreateNote")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Create Note - Zethub",
        description: "Zethub user note creation page.",
      }
    },
  }),
})
