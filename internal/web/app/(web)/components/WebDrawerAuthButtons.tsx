"use client"

import { LogInIcon, SquareArrowUpRight, UserPlus } from "lucide-react"

import { useAuth } from "@/components/auth/provider"

import { WebDrawerItem } from "./WebDrawerItem"

export const WebDrawerAuthButtons = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <nav className="w-full mt-4">
        <ul className="space-y-2 w-full">
          <WebDrawerItem
            text="Login"
            to="/login"
            icon={<LogInIcon className="size-6 text-primary" />}
          />
          <WebDrawerItem
            text="Register"
            to="/register"
            icon={<UserPlus className="size-6 text-primary" />}
          />
        </ul>
      </nav>
    )
  }

  return (
    <nav className="w-full mt-4">
      <ul className="space-y-2 w-full">
        <WebDrawerItem
          text="Go to App"
          to="/app"
          icon={<SquareArrowUpRight className="size-6 text-primary" />}
        />
        <WebDrawerItem
          text="Logout"
          to="http://localhost:6474/v1/auth/logout"
          icon={<UserPlus className="size-6 text-primary" />}
        />
      </ul>
    </nav>
  )
}

export default WebDrawerAuthButtons
