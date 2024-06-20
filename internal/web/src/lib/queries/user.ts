import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { User } from "@/types/app"
import api from "@/lib/api"

const useUserQuery = () => useQuery(userQueryOptions())

const userQueryOptions = () => {
  return {
    queryFn: userQuery,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
  }
}

const userQuery = async (): Promise<User | null> => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    return null
  }

  try {
    const data: User = await api.get("v1/auth/user").json()
    return data
  } catch (error) {
    toast.error("Error fetching user data", {
      description: `Network response was not ok. Please try again in a few minutes.`,
    })
    return null
  }
}

export { useUserQuery, userQuery }
