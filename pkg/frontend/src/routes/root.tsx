import { RootRoute } from "@tanstack/react-router"

import Root from "@/pages/root/Root"

export const rootRoute = new RootRoute({
  component: () => <Root />,
})
