"use client"

import {
  CommentNewSubmitButton,
  CommentNewTextarea,
  useCommentsSelectors,
} from "@udecode/plate-comments"

import { cn } from "@/utils/cn"
import { inputVariants } from "@/components/ui/form/Input"

import { editorButtonVariants } from "../EditorButton"
import { CommentAvatar } from "./CommentAvatar"

export function CommentCreateForm() {
  const myUserId = useCommentsSelectors().myUserId()

  return (
    <div className="flex w-full space-x-2">
      <CommentAvatar userId={myUserId} />

      <div className="flex grow flex-col items-end gap-2">
        <CommentNewTextarea className={inputVariants()} />

        <CommentNewSubmitButton
          className={cn(editorButtonVariants({ size: "sm" }), "w-[90px]")}
        >
          Comment
        </CommentNewSubmitButton>
      </div>
    </div>
  )
}
