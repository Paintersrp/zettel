import { useCallback } from "react"
import { useQueryClient, type QueryClient } from "@tanstack/react-query"
import {
  useNavigate,
  useRouter,
  type UseNavigateResult,
} from "@tanstack/react-router"
import Cookies from "js-cookie"
import { toast } from "sonner"

type Provider = "google" | "github"

const loginUrl = (provider: Provider) =>
  `http://localhost:6474/v1/auth/${provider}/login`

const handleSocialProviderLogin = (
  provider: Provider,
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  const loginWindow = window.open(loginUrl(provider), "_blank")

  const checkWindowClosed = setInterval(() => {
    if (loginWindow?.closed) {
      clearInterval(checkWindowClosed)

      const authToken = Cookies.get("jwt")
      if (authToken) {
        handleSuccess(client, navigate)
      } else {
        handleError()
      }
    }
  }, 300)
}

const handleSuccess = (
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  client.invalidateQueries({ queryKey: ["user"] })
  navigate({ to: "/" })
  toast.success("Login successful", {
    description: "You have been successfully logged in",
  })
}

const handleError = () => {
  toast.error("Login failed", {
    description: "There was an error while logging in. Please try again.",
  })
}

export const useSocialProviders = () => {
  const client = useQueryClient()
  const router = useRouter()
  const navigate = useNavigate({ from: router.state.location.pathname })

  const googleLogin = useCallback(
    () => handleSocialProviderLogin("google", client, navigate),
    [client, navigate]
  )

  const githubLogin = useCallback(
    () => handleSocialProviderLogin("github", client, navigate),
    [client, navigate]
  )

  return { googleLogin, githubLogin }
}
