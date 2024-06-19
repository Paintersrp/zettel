import { rootRoute } from "@/root"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const webLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "web-layout",
  component: lazyRouteComponent(() => import("./Web")),
})
