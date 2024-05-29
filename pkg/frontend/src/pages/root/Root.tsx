import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Outlet, ScrollRestoration } from "@tanstack/react-router"
import Cookies from "js-cookie"

import axios from "@/lib/axios"
import { useUserStore } from "@/lib/stores/user"
import { Toaster } from "@/components/ui/Sonner"

import "../../app.css"

const fetchUser = async () => {
  const jwtToken = Cookies.get("jwt")
  if (!jwtToken) {
    // TODO:
    return { id: 0, username: "" }
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

function Root() {
  // TODO: user hook
  const { setUser } = useUserStore()
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryFn: fetchUser,
    queryKey: ["user"],
    retry: false,
    refetchOnWindowFocus: false,
    initialData: {},
  })

  useEffect(() => {
    setUser(user)
  }, [user])

  useEffect(() => {
    if (error) {
      // TODO:
      console.error("Error fetching user:", error)
    }
  }, [error])

  // TODO:
  if (isLoading) {
    return <div>Loading...</div>
  }

  // TODO:
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Toaster />
      <ScrollRestoration />
      <Outlet />
    </>
  )
}

export default Root
