import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { verifyEmail, type VerifyResponse } from "../mutations/verifyEmail"

const onVerifyEmailSuccess = (
  response: VerifyResponse,
  router: AppRouterInstance
) => {
  router.refresh()
  toast.success("Email verification successful", {
    description: response.message,
  })
}

const onVerifyEmailError = (error: unknown) => {
  console.error("Email verification error:", error)
  toast.error("Verification failed", {
    description: "An error occurred during verification",
  })
}

const useVerifyEmail = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (res: VerifyResponse) => onVerifyEmailSuccess(res, router),
    onError: onVerifyEmailError,
  })
}

export { useVerifyEmail }
