import { useSocialProviders } from "@/hooks/useSocialProviders"
import { GitHubIcon, GoogleIcon } from "@/components/icons"

export const AuthFormFooter = () => {
  const { googleLogin, githubLogin } = useSocialProviders()

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
        <button
          onClick={() => githubLogin()}
          className="btn-secondary"
          type="button"
        >
          <span className="size-4 mr-2">
            <GitHubIcon />
          </span>
          <span>Github</span>
        </button>
        <button
          onClick={() => googleLogin()}
          className="btn-secondary"
          type="button"
        >
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
