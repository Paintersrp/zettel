import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/pages/app"

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
  },
})
