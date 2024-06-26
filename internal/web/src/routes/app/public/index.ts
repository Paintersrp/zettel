import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const publicRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/public",
  component: lazyRouteComponent(() => import("./Public")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Sources - Zethub",
        description: "Zethub user sources dashboard page.",
      }
    },
  }),
})
