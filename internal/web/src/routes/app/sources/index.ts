import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const sourcesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/sources",
  component: lazyRouteComponent(() => import("./Sources")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Sources - Zethub",
        description: "Zethub user sources dashboard page.",
      }
    },
  }),
})
