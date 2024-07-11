import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { register } from "@/lib/auth/actions/register"

const onRegisterSuccess = (token: string, router: AppRouterInstance) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  router.push("/")
  router.refresh()
}

const onRegisterError = (error: unknown) => {
  console.error("Register error:", error)
  toast.error("Registration failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred.",
  })
}

const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: register,
    onSuccess: (token: string) => onRegisterSuccess(token, router),
    onError: onRegisterError,
  })
}

export { useRegister }
