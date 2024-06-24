import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { appLayout } from "@/routes/app"

export const publicRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/public",
  component: lazyRouteComponent(() => import("./Public")),
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: `/login`,
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      getSeo: () => {
        return {
          title: "Sources - Zethub",
          description: "Zethub user sources dashboard page.",
        }
      },
    }
  },
})
