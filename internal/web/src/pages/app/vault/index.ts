import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/pages/app"

export const vaultRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/vault",
  component: lazyRouteComponent(() => import("./Vault")),
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
