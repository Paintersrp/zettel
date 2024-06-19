import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const sourcesRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/sources",
  component: lazyRouteComponent(() => import("./Sources")),
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
