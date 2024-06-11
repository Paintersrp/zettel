import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import api from "@/lib/api"
import { LoginRequest } from "@/lib/validators/auth"

interface LoginResponse {
  token: string
}

const useLoginMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: loginMutation,
    onSuccess: (token: string) => loginSuccess(token, client),
    onError: loginError,
  })
}

const loginMutation = async (payload: LoginRequest): Promise<string> => {
  try {
    const res = await api.post("v1/auth/login", { json: payload })

    if (res.status !== 200) {
      throw new Error("Network response was not ok")
    }

    const data: LoginResponse = await res.json()
    return data.token
  } catch (error) {
    console.error("Error logging in:", error)
    throw new Error("Failed to log in")
  }
}

const loginSuccess = (token: string, client: QueryClient) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })

  toast.success("Login successful", {
    description: `You have been successfully logged in. Redirecting...`,
  })
}

const loginError = (error: any) => {
  console.error("Login error:", error)

  if (error.response?.status === 401) {
    toast.error("Login failed", {
      description: "Incorrect email or password.",
    })
  } else {
    toast.error("Internal Server Error", {
      description: "Please try again in a few minutes.",
    })
  }
}

export { useLoginMutation, loginMutation }
