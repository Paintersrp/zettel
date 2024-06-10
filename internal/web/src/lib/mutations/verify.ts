import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import api from "@/lib/api"

interface VerifyResponse {
  message: string
}

const useVerifyMutation = () =>
  useMutation({
    mutationFn: verifyMutation,
    onSuccess: verifySuccess,
    onError: verifyError,
  })

const verifyMutation = async (token: string): Promise<VerifyResponse> => {
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

const verifySuccess = (response: VerifyResponse) => {
  toast.success("Email verification successful", {
    description: response.message,
  })
}

const verifyError = (error: any) => {
  console.error("Email verification error:", error)
  toast.error("Verification failed", {
    description: "An error occurred during verification",
  })
}

export { useVerifyMutation, verifyMutation }
