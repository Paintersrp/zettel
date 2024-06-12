import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { authLayout } from "@/pages/auth"

export const registerRoute = createRoute({
  getParentRoute: () => authLayout,
  path: "register",
  component: lazyRouteComponent(() => import("./Register")),
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/notes",
        search: { filter: "all" },
      })
    }
  },
})
