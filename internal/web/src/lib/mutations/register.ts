import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import Cookies from "js-cookie"
import { toast } from "sonner"

import axios from "@/lib/axios"
import { RegisterRequest } from "@/lib/validators/auth"

const registerPost = async (data: RegisterRequest) => {
  const { data: res, status } = await axios.post("v1/auth/register", data)

  if (status !== 200) {
    throw new Error("Network response was not ok")
  }

  return res.token
}

const registerSuccess = (
  token: string,
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  Cookies.set("jwt", token, { expires: 60, path: "/" })

  toast.success("Register successful", {
    description: `You have successfully registered an account.`,
  })

  client.invalidateQueries({ queryKey: ["user"] })
  navigate({ to: "/" })
}

const registerError = (error: any) => {
  // TODO:
  console.log(error)
}

const registerMutation = () => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return {
    mutationFn: registerPost,
    onSuccess: (token: string) => registerSuccess(token, client, navigate),
    onError: registerError,
  }
}

export { registerMutation, registerPost }
