import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

import { accountLayout } from "@/routes/app/account"

export const passwordRoute = createRoute({
  getParentRoute: () => accountLayout,
  path: "/account/password",
  component: lazyRouteComponent(() => import("./Password")),
  beforeLoad: ({ context, location }) => {
    if (!context.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      getSeo: () => {
        return {
          title: "Change Password - Account - Zethub",
          description: "Zethub user account change password page.",
        }
      },
    }
  },
})
