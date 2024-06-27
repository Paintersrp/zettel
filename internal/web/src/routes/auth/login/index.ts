import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { RedirectSearchSchema } from "@/features/auth/validators/redirect"
import { authLayout } from "@/routes/auth"

export const loginRoute = createRoute({
  getParentRoute: () => authLayout,
  component: lazyRouteComponent(() => import("./Login")),
  path: "login",
  validateSearch: RedirectSearchSchema,
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
          title: "Login - Zethub",
          description: "Zethub account login page.",
        }
      },
    }
  },
})
