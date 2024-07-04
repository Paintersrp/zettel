import { rootRoute } from "@/routes"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

export const splashRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/redirect",
  component: lazyRouteComponent(() => import("./SplashRedirect")),
  validateSearch: (search: { redirect: string }) => {
    return {
      redirect: search.redirect,
    }
  },
})
