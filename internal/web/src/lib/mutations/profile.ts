import { QueryClient, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { User } from "@/types/app"
import axios from "@/lib/axios"
import { ProfileRequest } from "@/lib/validators/profile"

const profilePost = async (data: ProfileRequest, user: User) => {
  const { data: res, status } = await axios.post("v1/auth/profile", {
    user_id: user.id,
    ...data,
  })

  if (status !== 200) {
    throw new Error("Network response was not ok")
  }

  return res
}

const profileSuccess = (token: string, client: QueryClient) => {
  toast.success("Profile update successful", {
    description: `You have successfully updated your profile.`,
  })

  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })
}

const profileError = (error: any) => {
  // TODO:
  console.log(error)
}

const profileMutation = (user: User) => {
  const client = useQueryClient()

  return {
    mutationFn: async (data: ProfileRequest) => profilePost(data, user),
    onSuccess: (res: { token: string; user: User }) =>
      profileSuccess(res.token, client),
    onError: profileError,
  }
}

export { profileMutation, profilePost }
