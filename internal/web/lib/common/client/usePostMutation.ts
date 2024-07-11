import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { postMutation, PostRequest, PostResponse } from "../mutations/post"

const onPostSuccess = <R>(res: PostResponse<R>, router: AppRouterInstance) => {
  router.refresh()
  toast.success(`${res.rep} creation successful`, {
    description: `You have successfully created a new ${res.rep.toLowerCase()}`,
  })
}

const onPostError = (error: unknown) => {
  console.error("Post error:", error)
  toast.error("Internal Server Error", {
    description: "Please try again in a few minutes.",
  })
}

const usePostMutation = <T, R>(payload: PostRequest<T>) => {
  const router = useRouter()
  return useMutation({
    mutationFn: async () => await postMutation<T, R>(payload),
    onSuccess: (res: PostResponse<R>) => onPostSuccess(res, router),
    onError: onPostError,
  })
}

export { usePostMutation }
