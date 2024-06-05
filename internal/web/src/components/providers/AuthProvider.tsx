import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { User } from "@/types/app"
import { userQuery } from "@/lib/queries/user"
import { Loading } from "@/components/Loading"

export interface AuthContext {
  user: User | undefined
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isFetched } = useQuery(userQuery())

  if (!isFetched) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
