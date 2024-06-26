import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { webLayout } from "@/routes/web"

export const landingRoute = createRoute({
  getParentRoute: () => webLayout,
  path: "/",
  component: lazyRouteComponent(() => import("./Landing")),
  beforeLoad: () => {
    return {
      getSeo: () => {
        return { title: "Zethub", description: "Zethub Home" }
      },
    }
  },
})
