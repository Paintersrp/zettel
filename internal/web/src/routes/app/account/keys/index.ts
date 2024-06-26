import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const keysRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/keys",
  component: lazyRouteComponent(() => import("./Keys")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "SSH Keys - Account - Zethub",
        description: "Zethub user account ssh key settings page.",
      }
    },
  }),
})
