"use client"

import { Button } from "@/components/ui/button/Button"
import { GitHubIcon, GoogleIcon } from "@/components/icons"

import { useSocialProviders } from "./useSocialProviders"

export const SocialProviderButtons = () => {
  const { googleLogin, githubLogin } = useSocialProviders()

  return (
    <>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-card text-primary">Or continue with</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            githubLogin()
          }}
        >
          <span className="size-4 mr-2">
            <GitHubIcon />
          </span>
          <span>Github</span>
        </Button>
        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            googleLogin()
          }}
        >
          <span className="size-4 mr-2">
            <GoogleIcon />
          </span>
          <span>Google</span>
        </Button>
      </div>
    </>
  )
}

export default SocialProviderButtons
