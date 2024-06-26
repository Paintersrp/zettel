import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const profileRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/profile",

  component: lazyRouteComponent(() => import("./Profile")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Profile - Account - Zethub",
        description: "Zethub user account profile settings page.",
      }
    },
  }),
})
