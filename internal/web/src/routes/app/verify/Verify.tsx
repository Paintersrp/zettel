import { useEffect, type FC } from "react"
import { BanIcon, CheckIcon, Loader2 } from "lucide-react"

import { useMounted } from "@/hooks/useMounted"

import { useVerifyEmailMutation } from "@/features/app/verify/api/verifyEmail"

import { verifyRoute } from "."

interface VerifyProps {}

const Verify: FC<VerifyProps> = () => {
  const search = verifyRoute.useSearch()
  const { user } = verifyRoute.useRouteContext()
  const isMounted = useMounted()
  const verifyMutation = useVerifyEmailMutation()

  useEffect(() => {
    if (isMounted) {
      if (search.token) {
        verifyMutation.mutate(search.token)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, search.token, verifyMutation.mutate])

  if (user?.verification_status === "verified") {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <CheckIcon className="size-12 text-success" />
        <h1 className="text-2xl font-bold">Email Already Verified</h1>
        <p>Your email has already been successfully verified.</p>
      </div>
    )
  }

  if (verifyMutation.isPending) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <Loader2 className="size-12 text-primary animate-spin" />
        <h1 className="text-2xl font-bold">Verifying Email</h1>
        <p>Please wait while we verify your email address...</p>
      </div>
    )
  }

  if (verifyMutation.isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <CheckIcon className="size-12 text-success" />
        <h1 className="text-2xl font-bold">Email Verified</h1>
        <p>Your email has been successfully verified.</p>
      </div>
    )
  }

  if (verifyMutation.isError) {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2">
        <BanIcon className="size-12 text-error" />
        <h1 className="text-2xl font-bold">Verification Failed</h1>
        <p>
          {(verifyMutation.error as { message?: string })?.message ||
            "An error occurred during verification"}
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
