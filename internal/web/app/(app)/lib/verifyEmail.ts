import { fetch } from "@/lib/fetch"

interface VerifyResponse {
  message: string
}

const verifyEmail = async (token: string): Promise<VerifyResponse> => {
  try {
    const response = await fetch(`/v1/auth/verify-email`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    })

    const data: VerifyResponse = await response.json()
    return data
  } catch (error) {
    console.error("Error verifying email:", error)
    throw new Error("An error occurred during verification")
  }
}

export { verifyEmail, type VerifyResponse }
