import type { QueryClient } from "@tanstack/react-query"
import { createRootRouteWithContext } from "@tanstack/react-router"

import type { User } from "@/types/app"

import CatchBoundary from "./CatchBoundary"
import NotFound from "./NotFound"
import Root from "./Root"

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
  component: () => <Root />,
  errorComponent: CatchBoundary,
  notFoundComponent: () => <NotFound />,
})
