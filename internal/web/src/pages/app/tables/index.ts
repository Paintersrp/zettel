import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/pages/app"

export const tablesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/tables",
  component: lazyRouteComponent(() => import("./Tables")),
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: `/login`,
        search: {
          redirect: location.href,
        },
      })
    }
  },
})
