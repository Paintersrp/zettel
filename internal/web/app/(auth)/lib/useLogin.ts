import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { LoginRequest } from "./validators"

interface LoginResponse {
  token: string
}

const login = async (payload: LoginRequest): Promise<string> => {
  const response = await fetch("http://localhost:6474/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized")
    }
    throw new Error("Network response was not ok")
  }

  const data: LoginResponse = await response.json()
  return data.token
}

// TODO: startTransition?
const onLoginSuccess = async (
  token: string,
  redirect: string | null,
  router: AppRouterInstance
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Login successful", {
    description: `You have been successfully logged in. Redirecting...`,
  })

  router.push(`/${redirect ?? ""}`)
  router.refresh()
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

type UseLoginProps = {
  redirect: string | null
}

const useLogin = ({ redirect }: UseLoginProps) => {
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: (token: string) => onLoginSuccess(token, redirect, router),
    onError: onLoginError,
  })
}

export { useLogin, login }
