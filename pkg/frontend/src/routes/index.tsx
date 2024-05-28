import { Router } from "@tanstack/react-router"

import { authRoute, loginRoute, registerRoute } from "@/routes/auth"
import { homeRoute } from "@/routes/home"
import { noteRoute } from "@/routes/note"
import { vaultRoute } from "@/routes/vault"

import { rootRoute } from "./root"

// TODO: Kitchen Sink

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  noteRoute,
  vaultRoute,
  homeRoute,
  authRoute,
])

export const router = new Router({ routeTree })
