import {
  createRootRouteWithContext,
  lazyRouteComponent,
} from "@tanstack/react-router"

import { RouterContext } from "./main"

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: lazyRouteComponent(() => import("./root")),
})
