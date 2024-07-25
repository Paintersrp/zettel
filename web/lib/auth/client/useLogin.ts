import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { login } from "@/lib/auth/actions/login"

// TODO: startTransition?
const onLoginSuccess = async (token: string, router: AppRouterInstance) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Login successful", {
    description: `You have been successfully logged in. Redirecting...`,
  })

  router.push("/")
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

const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess: (token: string) => onLoginSuccess(token, router),
    onError: onLoginError,
  })
}

export { useLogin }
