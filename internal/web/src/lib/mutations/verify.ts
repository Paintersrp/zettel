import axios from "@/lib/axios"

const verifyPost = async (token: string) => {
  try {
    const response = await axios.post("v1/auth/verify-email", { token })
    return response.data
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "An error occurred during verification"
    )
  }
}

const verifyMutation = () => ({ mutationFn: verifyPost })

export { verifyMutation, verifyPost }
