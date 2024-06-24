import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const vaultsRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/vaults",
  component: lazyRouteComponent(() => import("./Vaults")),
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      getSeo: () => {
        return {
          title: "Vaults - Zethub",
          description: "Overview of user's created vaults.",
        }
      },
    }
  },
})
