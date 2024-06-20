import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import api from "@/lib/api"
import { RegisterRequest } from "@/lib/validators/auth"

interface RegisterResponse {
  token: string
}

const useRegisterMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: registerMutation,
    onSuccess: (token: string) => registerSuccess(token, client),
    onError: registerError,
  })
}

const registerMutation = async (payload: RegisterRequest): Promise<string> => {
  const res = await api.post("v1/auth/register", { json: payload })
  if (res.status !== 200) {
    throw new Error("Network response was not ok")
  }
  const data: RegisterResponse = await res.json()
  return data.token
}

const registerSuccess = (token: string, client: QueryClient) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  client.invalidateQueries({ queryKey: ["user"] })
}

const registerError = (error: unknown) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

export { useRegisterMutation, registerMutation }
