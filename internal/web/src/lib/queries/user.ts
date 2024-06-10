import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"

import { User } from "@/types/app"
import api from "@/lib/api"

const useUserQuery = () =>
  useQuery({
    queryFn: userQuery,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
  })

const userQuery = async (): Promise<User | undefined> => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    // TODO:
    return undefined
  }

  try {
    const data: User = await api.get("v1/auth/user").json()
    return data
  } catch (error) {
    // TODO:
    console.error("Error fetching user:", error)
    throw new Error("Network response was not ok")
  }
}

export { useUserQuery, userQuery }
