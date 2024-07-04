import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const appRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/",
  component: lazyRouteComponent(() => import("./App")),
  beforeLoad: () => {
    return {
      getSeo: () => {
        return { title: "App - Zethub", description: "Zethub Application Home" }
      },
    }
  },
})
