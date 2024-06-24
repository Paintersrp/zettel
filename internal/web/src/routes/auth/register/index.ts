import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { authLayout } from "@/routes/auth"

export const registerRoute = createRoute({
  getParentRoute: () => authLayout,
  component: lazyRouteComponent(() => import("./Register")),
  path: "register",
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/notes",
        search: { filter: "all" },
      })
    }

    return {
      getSeo: () => {
        return {
          title: "Register - Zethub",
          description: "Zethub account registration page.",
        }
      },
    }
  },
})
