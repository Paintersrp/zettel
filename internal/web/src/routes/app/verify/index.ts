import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { z } from "zod"

import { appLayout } from "@/routes/app"

export const verifyRoute = createRoute({
  getParentRoute: () => appLayout,
  path: "/verify",
  validateSearch: z.object({
    token: z.string().optional(),
  }),
}).update({
  component: lazyRouteComponent(() => import("./Verify")),
})
