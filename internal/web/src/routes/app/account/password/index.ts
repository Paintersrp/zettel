import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const passwordRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/password",
  component: lazyRouteComponent(() => import("./Password")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Change Password - Account - Zethub",
        description: "Zethub user account change password page.",
      }
    },
  }),
})
