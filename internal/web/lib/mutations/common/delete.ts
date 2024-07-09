import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

import { fetch } from "@/lib/fetch"

type ObjectType = "notes" | "vaults" | "keys" | "providers"

type TypeMapEntry = {
  endpoint: string
  rep: string
}

type TypeMap = {
  [Key in ObjectType]: TypeMapEntry
}

const typeMap: TypeMap = {
  notes: { endpoint: "notes", rep: "Note" },
  vaults: { endpoint: "vaults", rep: "Vault" },
  keys: { endpoint: "keys", rep: "Key" },
  providers: { endpoint: "providers", rep: "Provider" },
}

interface DeleteRequest {
  id: number
  type: ObjectType
}

interface DeleteResponse {
  id: number
  rep: string
}

const useDeleteMutation = (payload: DeleteRequest) => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async () => await deleteMutation(payload),
    onSuccess: (res: DeleteResponse) => deleteSuccess(res, client),
    onError: deleteError,
  })
}

const deleteMutation = async ({
  id,
  type,
}: DeleteRequest): Promise<DeleteResponse> => {
  const { endpoint, rep } = typeMap[type]
  const response = await fetch(`/v1/api/${endpoint}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (response.status !== 204) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return { id, rep }
}

const deleteSuccess = (res: DeleteResponse, client: QueryClient) => {
  client.invalidateQueries({ queryKey: ["user"] })
  setTimeout(() => {
    toast.success(`${res.rep} deletion successful`, {
      description: `You have successfully deleted ${res.rep.toLowerCase()} with the id of: ${
        res.id
      }`,
    })
  }, 300)
}

const deleteError = (error: unknown) => {
  console.error("Delete error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useDeleteMutation }
