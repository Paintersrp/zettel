"use client"

import { useEffect } from "react"
import { AlertTriangle, BanIcon, CheckIcon, Loader2 } from "lucide-react"

import { useVerifyEmail } from "@/lib/account/client/useVerifyEmail"
import { useMounted } from "@/hooks/useMounted"
import { useAuth } from "@/components/auth/provider"

import { VerificationStatus } from "./VerificationStatus"

interface VerificationProps {
  token?: string
}

const Verification = ({ token }: VerificationProps) => {
  const { user } = useAuth()
  const isMounted = useMounted()
  const verifyMutation = useVerifyEmail()

  useEffect(() => {
    if (isMounted && token) {
      verifyMutation.mutate(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, token, verifyMutation.mutate])

  if (user?.verification_status === "verified") {
    return (
      <VerificationStatus
        icon={CheckIcon}
        title="Email Already Verified"
        message="Your email has already been successfully verified."
      />
    )
  }

  if (verifyMutation.isPending) {
    return (
      <VerificationStatus
        icon={Loader2}
        title="Verifying Email"
        message="Please wait while we verify your email address..."
        iconClass="animate-spin text-primary"
      />
    )
  }

  if (verifyMutation.isSuccess) {
    return (
      <VerificationStatus
        icon={CheckIcon}
        title="Email Verified"
        message="Your email has been successfully verified."
      />
    )
  }

  if (verifyMutation.isError) {
    return (
      <VerificationStatus
        icon={BanIcon}
        title="Verification Failed"
        message={
          (verifyMutation.error as { message?: string })?.message ||
          "An error occurred during verification"
        }
        iconClass="text-error"
      />
    )
  }

  return (
    <VerificationStatus
      icon={AlertTriangle}
      title="Invalid Verification Link"
      message="The verification link you used is invalid or expired. Please request a new verification link."
      iconClass="text-warning"
    />
  )
}
export default Verification
