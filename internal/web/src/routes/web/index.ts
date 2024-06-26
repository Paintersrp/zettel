import { rootRoute } from "@/routes"
import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router"

export const webLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: "web-layout",
  component: lazyRouteComponent(() => import("./Web")),
  beforeLoad: ({ context }) => {
    if (context.user) {
      if (context.user.active_vault) {
        throw redirect({
          to: `/app/notes`,
          search: { filter: "all" },
        })
      } else {
        throw redirect({
          to: "/app/vaults",
        })
      }
    }

    return {
      getSeo: () => {
        return { title: "Zethub", description: "Zethub Home" }
      },
    }
  },
})
