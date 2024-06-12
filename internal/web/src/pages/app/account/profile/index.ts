import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { accountLayout } from "@/pages/app/account"

export const profileRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/profile",

  component: lazyRouteComponent(() => import("./Profile")),
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
