import { useUserQuery } from "@/lib/queries/user"
import { Loading } from "@/components/Loading"

import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isFetched } = useUserQuery()

  if (!isFetched) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ user: user ?? null }}>
      {children}
    </AuthContext.Provider>
  )
}