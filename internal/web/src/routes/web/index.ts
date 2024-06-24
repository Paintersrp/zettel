import { rootRoute } from "@/routes"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const webLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "web-layout",
  component: lazyRouteComponent(() => import("./Web")),
  beforeLoad: () => ({
    getSeo: () => {
      return { title: "Zethub", description: "Zethub Home" }
    },
  }),
})
