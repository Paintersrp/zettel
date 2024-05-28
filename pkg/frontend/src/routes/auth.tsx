import { Route } from "@tanstack/react-router"

import Login from "@/pages/login/Login"
import Register from "@/pages/register/Register"
import AuthLayout from "@/layouts/auth/Auth"
import { rootRoute } from "@/routes/root"

export const authRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "auth-layout",
  component: () => <AuthLayout />,
})

export const loginRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/login",
  component: () => <Login />,
})

export const registerRoute = new Route({
  getParentRoute: () => authRoute,
  path: "/register",
  component: () => <Register />,
})
