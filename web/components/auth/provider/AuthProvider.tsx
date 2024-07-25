"use client"

import { use } from "react"

import { UserSession } from "@/types/app"

import { AuthContext } from "./AuthContext"

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: Promise<UserSession | null>
}) => {
  const userSession = use(user)
  const isOnboarding =
    (userSession?.onboarding && userSession?.onboarding_from !== "local") ||
    false

  return (
    <AuthContext.Provider value={{ user: userSession, isOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}
