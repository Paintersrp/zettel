import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { toast } from "sonner"

import axios from "@/lib/axios"
import { LoginRequest } from "@/lib/validators/auth"

const loginPost = async (data: LoginRequest) => {
  const { data: res, status } = await axios.post("v1/auth/login", data)

  if (status !== 200) {
    throw new Error("Network response was not ok")
  }

  return res.token
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
  // TODO:
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

const loginMutation = (redirect?: string) => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return {
    mutationFn: loginPost,
    onSuccess: (token: string) =>
      loginSuccess(token, client, navigate, redirect),
    onError: loginError,
  }
}

export { loginMutation, loginPost }
