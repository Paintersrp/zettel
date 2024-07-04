import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const verifyRoute = createRoute({
  getParentRoute: () => appLayout,
  component: lazyRouteComponent(() => import("./Verify")),
  path: "/verify",
  validateSearch: (search: { token?: string }) => ({
    token: search.token,
  }),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Verify Email - Zethub",
        description: "Zethub user email verification page.",
      }
    },
  }),
})
