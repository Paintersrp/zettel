import { Route } from "@tanstack/react-router"

import Note from "@/pages/note/Note"

import { rootRoute } from "./root"

export const noteRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/note/$id",
  component: () => <Note />,
})
