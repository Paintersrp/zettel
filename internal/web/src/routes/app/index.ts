import { rootRoute } from "@/index"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: lazyRouteComponent(() => import("./App")),
})
