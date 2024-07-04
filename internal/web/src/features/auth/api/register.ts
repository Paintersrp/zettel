import { useMutation } from "@tanstack/react-query"
import { useNavigate, type UseNavigateResult } from "@tanstack/react-router"
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

const onRegisterSuccess = (
  token: string,
  navigate: UseNavigateResult<"/auth/register">,
  redirect?: string
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  setTimeout(
    () => navigate({ to: "/auth/redirect", search: { redirect } }),
    300
  )
}

const onRegisterError = (error: unknown) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

type UseRegisterProps = {
  redirect?: string
}

const useRegister = ({ redirect }: UseRegisterProps) => {
  const navigate = useNavigate({ from: "/auth/register" })

  return useMutation({
    mutationFn: register,
    onSuccess: (token: string) => onRegisterSuccess(token, navigate, redirect),
    onError: onRegisterError,
  })
}

export { useRegister, register }
