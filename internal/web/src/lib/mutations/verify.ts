import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

import axios from "@/lib/axios"

interface VerifyResponse {
  message: string
}

const verifyMutation = () =>
  useMutation({
    mutationFn: verifyPost,
    onSuccess: verifySuccess,
    onError: verifyError,
  })

const verifyPost = async (token: string): Promise<VerifyResponse> => {
  try {
    const response = await axios.post<VerifyResponse>("v1/auth/verify-email", {
      token,
    })

    return response.data
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

const verifyError = (error: AxiosError) => {
  console.error("Email verification error:", error)
  toast.error("Verification failed", {
    description: "An error occurred during verification",
  })
}

export { verifyMutation, verifyPost }
