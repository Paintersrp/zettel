import { useGetUser } from "@/features/auth/api/getUser"

import { AuthContext } from "./AuthContext"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const getUserQuery = useGetUser()

  // if (!getUserQuery.isFetched) {
  //   return <Loading />
  // }

  return (
    <AuthContext.Provider
      value={{
        user: getUserQuery.data ?? null,
        isFetched: getUserQuery.isFetched,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
