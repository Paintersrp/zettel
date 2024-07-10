"use client"

import { UserSession } from "@/types/app"

import { AuthContext } from "./AuthContext"

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: UserSession | null
}) => {
  const isOnboarding =
    (user?.onboarding && user?.onboarding_from !== "local") || false

  return (
    <AuthContext.Provider value={{ user, isOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}
