import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const vaultsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/vaults",
  component: lazyRouteComponent(() => import("./Vaults")),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Vaults - Zethub",
        description: "Overview of user's created vaults.",
      }
    },
  }),
})
