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
  validateSearch: (search: { redirect: string }) => {
    return {
      redirect: search.redirect,
    }
  },
  beforeLoad: ({ context }) => {
    if (context.user) {
      throw redirect({
        to: "/app/notes",
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
