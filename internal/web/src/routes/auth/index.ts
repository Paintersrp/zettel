import { rootRoute } from "@/index"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const authLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: lazyRouteComponent(() => import("./Auth")),
})
