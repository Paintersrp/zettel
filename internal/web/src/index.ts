import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  lazyRouteComponent,
} from "@tanstack/react-router"

import type { User } from "@/types/app"

export type RouterContext = {
  head: string
  queryClient: QueryClient
  user: User | null
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: lazyRouteComponent(() => import("./root")),
})
