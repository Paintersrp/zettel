import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { api } from "@/lib/api"

import type { LoginRequest } from "@/features/auth/validators/login"

interface LoginResponse {
  token: string
}

const login = async (payload: LoginRequest): Promise<string> => {
  const res = await api.post("v1/auth/login", { json: payload })

  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }

  const data: LoginResponse = await res.json()
  return data.token
}

// TODO: startTransition?
const onLoginSuccess = (token: string, client: QueryClient) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })

  toast.success("Login successful", {
    description: `You have been successfully logged in. Redirecting...`,
  })
}

const onLoginError = (error: unknown) => {
  console.error("Login error:", error)

  if ((error as { response: { status: number } }).response?.status === 401) {
    toast.error("Login failed", {
      description: "Incorrect email or password.",
    })
  } else {
    toast.error("Internal Server Error", {
      description: "Please try again in a few minutes.",
    })
  }
}

const useLogin = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: login,
    onSuccess: (token: string) => onLoginSuccess(token, client),
    onError: onLoginError,
  })
}

export { useLogin, login }
