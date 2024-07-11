import { useCallback } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { toast } from "sonner"

type Provider = "google" | "github"

const loginUrl = (provider: Provider) =>
  `http://localhost:6474/v1/auth/${provider}/login`

const handleSocialProviderLogin = (
  provider: Provider,
  router: AppRouterInstance
) => {
  const loginWindow = window.open(loginUrl(provider), "_blank")

  const checkWindowClosed = setInterval(() => {
    if (loginWindow?.closed) {
      clearInterval(checkWindowClosed)

      const authToken = Cookies.get("jwt")
      if (authToken) {
        handleSuccess(router)
      } else {
        handleError()
      }
    }
  }, 300)
}

const handleSuccess = (router: AppRouterInstance) => {
  toast.success("Login successful", {
    description: "You have been successfully logged in",
  })
  router.push("/")
  router.refresh()
}

const handleError = () => {
  toast.error("Login failed", {
    description: "There was an error while logging in. Please try again.",
  })
}

export const useSocialProviders = () => {
  const router = useRouter()

  const googleLogin = useCallback(
    () => handleSocialProviderLogin("google", router),
    [router]
  )

  const githubLogin = useCallback(
    () => handleSocialProviderLogin("github", router),
    [router]
  )

  return { googleLogin, githubLogin }
}
