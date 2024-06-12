import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/pages/app"

export const createVaultRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/vault/create",
  component: lazyRouteComponent(() => import("./CreateVault")),
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
