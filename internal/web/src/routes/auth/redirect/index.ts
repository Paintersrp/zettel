import { rootRoute } from "@/routes"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { RedirectSearchSchema } from "@/features/auth/validators/redirect"

export const splashRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth/redirect",
  component: lazyRouteComponent(() => import("./SplashRedirect")),
  validateSearch: RedirectSearchSchema,
})
