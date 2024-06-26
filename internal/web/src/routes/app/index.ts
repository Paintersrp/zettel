import { rootRoute } from "@/routes"
import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

export const appLayout = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: lazyRouteComponent(() => import("./AppLayout")),
  beforeLoad: ({ context, location }) => {
    if (context.user) {
      if (!context.user.active_vault) {
        throw redirect({
          to: "/app/vaults",
        })
      }
    } else {
      throw redirect({
        to: `/auth/login`,
        search: {
          redirect: location.href,
        },
      })
    }

    return {
      getSeo: () => {
        return { title: "App - Zethub", description: "Zethub Application Home" }
      },
    }
  },
})

export const appRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/",
  component: lazyRouteComponent(() => import("./App")),
  beforeLoad: () => {
    return {
      getSeo: () => {
        return { title: "App - Zethub", description: "Zethub Application Home" }
      },
    }
  },
})
