import { rootRoute } from "@/routes"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: lazyRouteComponent(() => import("./App")),
  beforeLoad: () => ({
    getSeo: () => {
      return { title: "App - Zethub", description: "Zethub Application Home" }
    },
  }),
})
