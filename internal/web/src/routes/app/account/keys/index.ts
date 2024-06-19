import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const keysRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/keys",
  component: lazyRouteComponent(() => import("./Keys")),
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
