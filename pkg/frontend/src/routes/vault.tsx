import { Route } from "@tanstack/react-router"

import Vault from "@/pages/vault/Vault"

import { rootRoute } from "./root"

export const vaultRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/vault/$id",
  component: () => <Vault />,
})
