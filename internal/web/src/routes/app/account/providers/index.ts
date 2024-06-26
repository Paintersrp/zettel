import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const providersRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/providers",
  component: lazyRouteComponent(() => import("./Providers")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Providers - Account - Zethub",
        description: "Zethub user account social providers settings page.",
      }
    },
  }),
})
