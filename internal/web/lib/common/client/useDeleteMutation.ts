import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  deleteMutation,
  DeleteRequest,
  DeleteResponse,
} from "../mutations/delete"

const onDeleteSuccess = (res: DeleteResponse, router: AppRouterInstance) => {
  router.refresh()
  toast.success(`${res.rep} deletion successful`, {
    description: `You have successfully deleted ${res.rep.toLowerCase()} with the id of: ${
      res.id
    }`,
  })
}

const onDeleteError = (error: unknown) => {
  console.error("Delete error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useDeleteMutation = (payload: DeleteRequest) => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => await deleteMutation(payload),
    onSuccess: (res: DeleteResponse) => onDeleteSuccess(res, router),
    onError: onDeleteError,
  })
}

export { useDeleteMutation }
