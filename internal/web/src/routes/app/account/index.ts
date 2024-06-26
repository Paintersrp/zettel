import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const accountLayout = createRoute({
  getParentRoute: () => appLayout,
  id: "account-layout",
  component: lazyRouteComponent(() => import("./Account")),
})

export const accountRedirectRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account",
  beforeLoad: () => {
    throw redirect({
      to: "/app/account/profile",
    })
  },
})
