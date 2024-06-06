import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, UseNavigateResult } from "@tanstack/react-router"
import { toast } from "sonner"

import { User } from "@/types/app"
import axios from "@/lib/axios"

export interface VaultSwitchRequest {
  id: number
}

const vaultSwitchMutation = (user: User) => {
  const client = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: VaultSwitchRequest) => vaultSwitchPost(data, user),
    onSuccess: () => vaultSwitchSuccess(client, navigate),
    onError: vaultSwitchError,
  })
}

const vaultSwitchPost = async (
  data: VaultSwitchRequest,
  user: User
): Promise<boolean> => {
  try {
    const { status } = await axios.post("v1/auth/change-vault", {
      vault_id: data.id,
      user_id: user.id,
    })

    if (status !== 200) {
      throw new Error("Network response was not ok")
    }

    return true
  } catch (error) {
    console.error("Error switching vault:", error)
    throw new Error("Failed to switch vault")
  }
}

const vaultSwitchSuccess = (
  client: QueryClient,
  navigate: UseNavigateResult<string>
) => {
  client.invalidateQueries({ queryKey: ["user"] })

  setTimeout(() => {
    navigate({ to: "/vault" })
    toast.success("Active vault change successful", {
      description: `You have successfully changed vaults. Redirecting...`,
    })
  }, 300)
}

const vaultSwitchError = (error: unknown) => {
  console.error("Vault switch error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { vaultSwitchMutation, vaultSwitchPost }
