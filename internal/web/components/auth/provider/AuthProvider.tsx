"use client"

import { User } from "@/types/app"

import { AuthContext } from "./AuthContext"

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | null
}) => {
  const isOnboarding =
    (user?.onboarding && user?.onboarding_from !== "local") || false

  return (
    <AuthContext.Provider value={{ user, isOnboarding }}>
      {children}
    </AuthContext.Provider>
  )
}
