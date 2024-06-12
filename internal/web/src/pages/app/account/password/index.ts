import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { accountLayout } from "@/pages/app/account"

export const passwordRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/password",
  component: lazyRouteComponent(() => import("./Password")),
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
