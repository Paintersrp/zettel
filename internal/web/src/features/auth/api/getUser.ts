import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

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
    toast.error("Error fetching user data", {
      description: `Network response was not ok. Please try again in a few minutes.`,
    })
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

const useGetUser = () => useQuery(getUserOptions())

export { useGetUser, getUser }
