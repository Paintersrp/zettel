import "./app.css"

import { useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { Route, Routes, ScrollRestoration } from "react-router-dom"

import axios from "@/lib/axios"
import { vaultLoader } from "@/lib/queries/vault"
import { useUserStore } from "@/lib/stores/user"
import { Toaster } from "@/components/ui/Sonner"
import HomeRoute from "@/routes/home/Home"
import LoginRoute from "@/routes/login/Login"
import NoteRoute from "@/routes/note/Note"
import RegisterRoute from "@/routes/register/Register"
import VaultRoute from "@/routes/vault/Vault"

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
  const client = useQueryClient()

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
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/register" element={<RegisterRoute />} />
        <Route
          path="/vault/:id"
          element={<VaultRoute />}
          loader={() => vaultLoader(client)}
        />
        <Route path="/note/:id" element={<NoteRoute />} />
      </Routes>
    </>
  )
}

export default Root
