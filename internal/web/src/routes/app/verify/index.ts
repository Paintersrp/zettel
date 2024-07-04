import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { VerifySchema } from "@/features/app/verify/validators"
import { appLayout } from "@/routes/app"

export const verifyRoute = createRoute({
  getParentRoute: () => appLayout,
  component: lazyRouteComponent(() => import("./Verify")),
  path: "/verify",
  validateSearch: VerifySchema,
  beforeLoad: () => ({
    getSeo: () => {
      return {
        title: "Verify Email - Zethub",
        description: "Zethub user email verification page.",
      }
    },
  }),
})
