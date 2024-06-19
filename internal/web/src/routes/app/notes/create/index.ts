import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const noteCreateRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/notes/create",
  component: lazyRouteComponent(() => import("./CreateNote")),
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
