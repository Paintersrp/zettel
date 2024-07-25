import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { postNote } from "@/lib/note/mutations/postNote"

const onPostNoteSuccess = (router: AppRouterInstance) => {
  toast.success(`Note creation successful`, {
    description: `You have successfully created a new note.`,
  })
  router.refresh()
}

const onPostNoteError = (error: unknown) => {
  console.error("Create note error:", error)
  toast.error("Failed to create note", {
    description: "Please try again in a few minutes.",
  })
}

const usePostNote = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: postNote,
    onSuccess: () => {
      onPostNoteSuccess(router)
    },
    onError: onPostNoteError,
  })
}

export { usePostNote }
