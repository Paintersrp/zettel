import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { webLayout } from "@/pages/web"

export const homeRoute = createRoute({
  getParentRoute: () => webLayout,
  path: "/",
  component: lazyRouteComponent(() => import("./Home")),
  beforeLoad: ({ context }) => {
    if (context.user) {
      if (context.user.active_vault) {
        throw redirect({
          to: `/notes`,
          search: { filter: "all" },
        })
      } else {
        throw redirect({
          to: "/vault/create",
        })
      }
    }
  },
})
