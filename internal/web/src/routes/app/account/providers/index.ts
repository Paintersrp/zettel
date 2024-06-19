import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const providersRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/providers",
  component: lazyRouteComponent(() => import("./Providers")),
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
