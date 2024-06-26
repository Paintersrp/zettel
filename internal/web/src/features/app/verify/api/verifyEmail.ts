import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { api } from "@/lib/api"

interface VerifyResponse {
  message: string
}

const verifyEmail = async (token: string): Promise<VerifyResponse> => {
  try {
    const data: VerifyResponse = await api
      .post("v1/auth/verify-email", {
        json: {
          token,
        },
      })
      .json()

    return data
  } catch (error) {
    console.error("Error verifying email:", error)
    throw new Error("An error occurred during verification")
  }
}

const onVerifyEmailSuccess = (response: VerifyResponse) => {
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

const useVerifyEmail = () =>
  useMutation({
    mutationFn: verifyEmail,
    onSuccess: onVerifyEmailSuccess,
    onError: onVerifyEmailError,
  })

export { useVerifyEmail, verifyEmail }
