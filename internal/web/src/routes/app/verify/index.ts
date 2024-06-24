import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { z } from "zod"

import { appLayout } from "@/routes/app"

export const verifyRoute = createRoute({
  getParentRoute: () => appLayout,
  component: lazyRouteComponent(() => import("./Verify")),
  path: "/verify",
  validateSearch: z.object({
    token: z.string().optional(),
  }),
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Verify Email - Zethub",
        description: "Zethub user email verification page.",
      }
    },
  }),
})
