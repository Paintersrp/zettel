import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { User } from "@/types/app"
import api from "@/lib/api"
import { ProfileRequest } from "@/lib/validators/profile"

export interface ProfileResponse {
  token: string
  user: User
}

const useProfileMutation = (user: User) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: ProfileRequest) => profileMutation(data, user),
    onSuccess: (res: { token: string; user: User }) =>
      profileSuccess(res.token, client),
    onError: profileError,
  })
}

const profileMutation = async (
  payload: ProfileRequest,
  user: User
): Promise<ProfileResponse> => {
  try {
    const res = await api.post("v1/auth/profile", {
      json: {
        user_id: user.id,
        ...payload,
      },
    })

    return await res.json()
  } catch (error) {
    throw new Error("Failed to update profile")
  }
}

const profileSuccess = (token: string, client: QueryClient) => {
  toast.success("Profile update successful", {
    description: `You have successfully updated your profile.`,
  })

  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })
}

const profileError = (error: unknown) => {
  console.error("Profile update failed:", error)
  toast.error("Profile update failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred",
  })
}

export { useProfileMutation, profileMutation }
