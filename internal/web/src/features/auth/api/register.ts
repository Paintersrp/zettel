import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { api } from "@/lib/api"

import type { RegisterRequest } from "@/features/auth/validators/register"

interface RegisterResponse {
  token: string
}

const register = async (payload: RegisterRequest): Promise<string> => {
  const res = await api.post("v1/auth/register", { json: payload })
  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }
  const data: RegisterResponse = await res.json()
  return data.token
}

const onRegisterSuccess = (token: string, client: QueryClient) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  client.invalidateQueries({ queryKey: ["user"] })
}

const onRegisterError = (error: unknown) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

const useRegister = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: register,
    onSuccess: (token: string) => onRegisterSuccess(token, client),
    onError: onRegisterError,
  })
}

export { useRegister, register }
