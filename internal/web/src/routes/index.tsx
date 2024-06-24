import type { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  lazyRouteComponent,
} from "@tanstack/react-router"

import type { User } from "@/types/app"

import CatchBoundary from "./CatchBoundary"
import NotFound from "./NotFound"

export type RouterContext = {
  head: string
  queryClient: QueryClient
  user: User | null
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  beforeLoad: () => ({
    getSeo: () => {
      return { title: "Zethub", description: "Zethub Notes" }
    },
  }),
  component: lazyRouteComponent(() => import("./root")),
  errorComponent: CatchBoundary,
  notFoundComponent: () => <NotFound />,
})
