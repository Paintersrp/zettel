import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"

import axios from "@/lib/axios"
import { LoginRequest } from "@/lib/validators/auth"

interface LoginResponse {
  token: string
}

const loginMutation = (redirect?: string) => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: loginPost,
    onSuccess: (token: string) =>
      loginSuccess(token, client, navigate, redirect),
    onError: loginError,
  })
}

const loginPost = async (data: LoginRequest): Promise<string> => {
  try {
    const { data: res, status } = await axios.post<LoginResponse>(
      "v1/auth/login",
      data
    )

    if (status !== 200) {
      throw new Error("Network response was not ok")
    }

    return res.token
  } catch (error) {
    console.error("Error logging in:", error)
    throw new Error("Failed to log in")
  }
}

const loginSuccess = (
  token: string,
  client: QueryClient,
  navigate: UseNavigateResult<string>,
  redirect?: string
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  client.invalidateQueries({ queryKey: ["user"] })

  setTimeout(() => {
    if (redirect) {
      navigate({ to: redirect })
    } else {
      navigate({ to: "/" })
    }
    toast.success("Login successful", {
      description: `You have been successfully logged in. Redirecting...`,
    })
  }, 300)
}

const loginError = (error: AxiosError) => {
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

export { loginMutation, loginPost }
