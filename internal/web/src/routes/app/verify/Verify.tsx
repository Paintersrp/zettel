import { useEffect } from "react"
import { Loader2 } from "lucide-react"

import { useVerifyMutation } from "@/lib/mutations/verify"
import { useMounted } from "@/hooks/useMounted"
import { CheckIcon, ErrorIcon } from "@/components/icons"

import { verifyRoute } from "."

interface VerifyProps {}

const Verify = ({}: VerifyProps) => {
  const search = verifyRoute.useSearch()
  const { user } = verifyRoute.useRouteContext()
  const isMounted = useMounted()

  const {
    mutate: verify,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyMutation()

  useEffect(() => {
    if (isMounted) {
      if (search.token) {
        verify(search.token)
      }
    }
  }, [isMounted, search.token, verify])

  if (user?.verification_status === "verified") {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <span className="size-12 text-success">
          <CheckIcon />
        </span>
        <h1 className="text-2xl font-bold">Email Already Verified</h1>
        <p>Your email has already been successfully verified.</p>
      </div>
    )
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <h1 className="text-2xl font-bold">Verifying Email</h1>
        <p>Please wait while we verify your email address...</p>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <span className="size-12 text-success">
          <CheckIcon />
        </span>
        <h1 className="text-2xl font-bold">Email Verified</h1>
        <p>Your email has been successfully verified.</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <span className="size-12 text-error">
          <ErrorIcon />
        </span>
        <h1 className="text-2xl font-bold">Verification Failed</h1>
        <p>
          {(error as any)?.message || "An error occurred during verification"}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <h1 className="text-2xl font-bold">Invalid Verification Link</h1>
      <p>
        The verification link you used is invalid or expired. Please request a
        new verification link.
      </p>
    </div>
  )
}

export default Verify
