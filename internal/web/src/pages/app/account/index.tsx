import { createRoute, lazyRouteComponent } from "@tanstack/react-router"

import { appLayout } from ".."

export const accountLayout = createRoute({
  getParentRoute: () => appLayout,
  id: "account-layout",
  component: lazyRouteComponent(() => import("./Account")),
})
