import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  updateMutation,
  UpdateRequest,
  UpdateResponse,
} from "../mutations/update"

const onUpdateSuccess = <R>(
  res: UpdateResponse<R>,
  router: AppRouterInstance
) => {
  router.refresh()
  toast.success(`${res.rep} update successful`, {
    description: `You have successfully updated the ${res.rep.toLowerCase()}`,
  })
}

const onUpdateError = (error: unknown) => {
  console.error("Update error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const useUpdateMutation = <T, R>(payload: UpdateRequest<T>) => {
  const router = useRouter()
  return useMutation({
    mutationFn: async () => await updateMutation<T, R>(payload),
    onSuccess: (res: UpdateResponse<R>) => onUpdateSuccess(res, router),
    onError: onUpdateError,
  })
}

export { useUpdateMutation }
