import { useQuery } from "@tanstack/react-query"

import { getUser } from "./getUser"

const getUserOptions = () => {
  return {
    queryFn: getUser,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
  }
}

const useGetUser = () => useQuery(getUserOptions())

export { useGetUser, getUserOptions }
