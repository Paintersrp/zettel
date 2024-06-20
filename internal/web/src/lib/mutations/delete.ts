import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

// import api from "@/lib/api"

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
  return useMutation({
    mutationFn: () => deleteMutation(payload),
    onSuccess: (res: DeleteResponse) => deleteSuccess(res),
    onError: deleteError,
  })
}

const deleteMutation = async ({
  id,
  type,
}: DeleteRequest): Promise<DeleteResponse> => {
  const { endpoint, rep } = typeMap[type]
  console.log("Delete clicked...", { id, type }, `v1/api/${endpoint}/${id}`)

  // const res = await api.delete(`v1/api/${endpoint}/${id}`)
  // if (res.status !== 200) {
  //   throw new Error("Network response was not ok")
  // }

  return { id, rep }
}

const deleteSuccess = (res: DeleteResponse) => {
  toast.success(`${res.rep} deletion successful`, {
    description: `You have successfully deleted ${res.rep.toLowerCase()} with the id of: ${res.id}`,
  })
}

const deleteError = (error: unknown) => {
  console.error("Delete error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

export { useDeleteMutation }
