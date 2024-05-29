import Home from "@/pages/home/Home"
import { Route } from "@tanstack/react-router"

import { rootRoute } from "./root"

export const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
})
