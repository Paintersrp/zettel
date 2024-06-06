import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { toast } from "sonner"

import axios from "@/lib/axios"
import { RegisterRequest } from "@/lib/validators/auth"

interface RegisterResponse {
  token: string
}

const registerMutation = () => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: registerPost,
    onSuccess: (token: string) => registerSuccess(token, client, navigate),
    onError: registerError,
  })
}

const registerPost = async (data: RegisterRequest): Promise<string> => {
  try {
    const { data: res, status } = await axios.post<RegisterResponse>(
      "v1/auth/register",
      data
    )

    if (status !== 200) {
      throw new Error("Network response was not ok")
    }

    return res.token
  } catch (error) {
    console.error("Error registering:", error)
    throw new Error("Failed to register")
  }
}

const registerSuccess = (
  token: string,
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  client.invalidateQueries({ queryKey: ["user"] })
  navigate({ to: "/" })
}

const registerError = (error: any) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

export { registerMutation, registerPost }
