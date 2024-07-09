import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { RegisterRequest } from "./validators"

interface RegisterResponse {
  token: string
}

const register = async (payload: RegisterRequest): Promise<string> => {
  const response = await fetch("http://localhost:6474/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || "Network response was not ok")
  }

  const data: RegisterResponse = await response.json()
  return data.token
}

const onRegisterSuccess = (
  token: string,
  redirect: string | null,
  router: AppRouterInstance
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  setTimeout(() => router.push(`/?redirect=${redirect}`), 300)
}

const onRegisterError = (error: unknown) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

type UseRegisterProps = {
  redirect: string | null
}

const useRegister = ({ redirect }: UseRegisterProps) => {
  const router = useRouter()

  return useMutation({
    mutationFn: register,
    onSuccess: (token: string) => onRegisterSuccess(token, redirect, router),
    onError: onRegisterError,
  })
}

export { useRegister, register }
