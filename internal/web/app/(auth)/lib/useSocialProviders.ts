import { useCallback } from "react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { redirect, useRouter } from "next/navigation"
import { useQueryClient, type QueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

type Provider = "google" | "github"

const loginUrl = (provider: Provider) =>
  `http://localhost:6474/v1/auth/${provider}/login`

const handleSocialProviderLogin = (
  provider: Provider,
  client: QueryClient,
  router: AppRouterInstance
) => {
  const loginWindow = window.open(loginUrl(provider), "_blank")

  const checkWindowClosed = setInterval(() => {
    if (loginWindow?.closed) {
      clearInterval(checkWindowClosed)

      const authToken = Cookies.get("jwt")
      if (authToken) {
        handleSuccess(client, router)
      } else {
        handleError()
      }
    }
  }, 300)
}

const handleSuccess = (client: QueryClient, router: AppRouterInstance) => {
  client.invalidateQueries({ queryKey: ["user"] })
  toast.success("Login successful", {
    description: "You have been successfully logged in",
  })
  router.push("/")
}

const handleError = () => {
  toast.error("Login failed", {
    description: "There was an error while logging in. Please try again.",
  })
}

export const useSocialProviders = () => {
  const client = useQueryClient()
  const router = useRouter()

  const googleLogin = useCallback(
    () => handleSocialProviderLogin("google", client, router),
    [client, router]
  )

  const githubLogin = useCallback(
    () => handleSocialProviderLogin("github", client, router),
    [client, router]
  )

  return { googleLogin, githubLogin }
}
