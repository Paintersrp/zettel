import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { GitHubIcon, GoogleIcon } from "@/components/icons"

type Provider = "google" | "github"

const handleProviderLogin = (
  navigate: UseNavigateResult<string>,
  client: QueryClient,
  provider: Provider
) => {
  const loginWindow = window.open(
    `http://localhost:6474/v1/auth/${provider}/login`,
    "_blank"
  )

  const checkWindowClosed = setInterval(() => {
    if (loginWindow?.closed) {
      clearInterval(checkWindowClosed)

      const authToken = Cookies.get("jwt")
      if (authToken) {
        toast.success("Login successful", {
          description: `You have been successfully logged in`,
        })

        client.invalidateQueries({ queryKey: ["user"] })
        navigate({ to: "/" })
      } else {
        console.error("Login failed")
      }
    }
  }, 300)
}

export const AuthFormFooter = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const onGoogleClick = () => {
    handleProviderLogin(navigate, queryClient, "google")
  }

  const onGitHubClick = () => {
    handleProviderLogin(navigate, queryClient, "github")
  }

  return (
    <>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-contrast text-primary">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <button onClick={onGitHubClick} className="btn-secondary" type="button">
          <span className="size-4 mr-2">
            <GitHubIcon />
          </span>
          <span>Github</span>
        </button>
        <button onClick={onGoogleClick} className="btn-secondary" type="button">
          <span className="size-4 mr-2">
            <GoogleIcon />
          </span>
          <span>Google</span>
        </button>
      </div>
    </>
  )
}

export default AuthFormFooter
