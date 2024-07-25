"use client"

import { CheckIcon } from "lucide-react"

import { useSendEmailVerification } from "@/lib/account/client/useSendEmailVerification"
import { Button } from "@/components/ui/button/Button"
import { useAuth } from "@/components/auth/provider"

// TODO: Needs better disable handling when an email has recently been sent
// TODO: Needs a better way to invalidate after the user has validated the email... event?

export const ResetPasswordButton = () => {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  const sendVerificationMutation = useSendEmailVerification({ user })
  const isVerified = user!.verification_status === "verified"

  return (
    <Button
      size="xs"
      variant="primary"
      className="mt-2"
      onClick={() => sendVerificationMutation.mutate()}
      disabled={isVerified}
    >
      {isVerified ? (
        <div className="flex items-center gap-1">
          <CheckIcon className="size-5 text-success" />
          Email Verified
        </div>
      ) : (
        <span>Send Verification Email</span>
      )}
    </Button>
  )
}

export default ResetPasswordButton
