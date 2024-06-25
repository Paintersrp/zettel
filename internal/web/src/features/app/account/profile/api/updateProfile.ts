import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { api } from "@/lib/api"
import type { User } from "@/types/app"

import { UpdateProfileRequest } from "@/features/app/account/profile/validators"

export interface ProfileResponse {
  token: string
  user: User
}

const useUpdateProfileMutation = (user: User) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) =>
      await updateProfileMutation(data, user),
    onSuccess: (res: { token: string; user: User }) =>
      updateProfileSuccess(res.token, client),
    onError: updateProfileError,
  })
}

const updateProfileMutation = async (
  payload: UpdateProfileRequest,
  user: User
): Promise<ProfileResponse> => {
  const res = await api.post("v1/auth/profile", {
    json: {
      user_id: user.id,
      ...payload,
    },
  })
  return await res.json()
}

const updateProfileSuccess = (token: string, client: QueryClient) => {
  toast.success("Profile update successful", {
    description: `You have successfully updated your profile.`,
  })

  Cookies.set("jwt", token, { expires: 60, path: "/" })
  client.invalidateQueries({ queryKey: ["user"] })
}

const updateProfileError = (error: unknown) => {
  console.error("Profile update failed:", error)
  toast.error("Profile update failed", {
    description:
      error instanceof Error ? error.message : "An unknown error occurred",
  })
}

export { useUpdateProfileMutation, updateProfileMutation }
