import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { authLayout } from "@/routes/auth"

export const loginRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "login",
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/notes",
        search: { filter: "all" },
      })
    }
  },
}).update({
  component: lazyRouteComponent(() => import("./Login")),
})
