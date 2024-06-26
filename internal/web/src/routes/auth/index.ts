import { rootRoute } from "@/routes"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  component: lazyRouteComponent(() => import("./Auth")),
})
