import { useSuspenseQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"

import { api } from "@/lib/api"
import { User } from "@/types/app"

const getUser = async (): Promise<User | null> => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    return null
  }

  try {
    const data: User = await api.get("v1/auth/user").json()
    return data
  } catch (error) {
    return null
  }
}

const getUserOptions = () => {
  return {
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
  }
}

const useGetUser = () => useSuspenseQuery(getUserOptions())

export { useGetUser, getUser }
