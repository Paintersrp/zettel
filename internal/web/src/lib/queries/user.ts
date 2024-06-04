import Cookies from "js-cookie"

import axios from "@/lib/axios"

const fetchUser = async () => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    // TODO:
    return null
  }

  try {
    const { data } = await axios.get("v1/auth/user")

    return data
  } catch (error) {
    // TODO:
    console.error("Error fetching user:", error)
    throw new Error("Network response was not ok")
  }
}

const userQuery = () => ({
  queryFn: fetchUser,
  queryKey: ["user"],
  retry: false,
  refetchOnWindowFocus: false,
  initialData: {},
})

export { userQuery, fetchUser }
