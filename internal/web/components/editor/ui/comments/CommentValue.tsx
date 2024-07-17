"use client"

import {
  CommentEditActions,
  CommentEditTextarea,
} from "@udecode/plate-comments"

import { cn } from "@/utils/cn"
import { inputVariants } from "@/components/ui/form/Input"

import { editorButtonVariants } from "../EditorButton"

export function CommentValue() {
  return (
    <div className="my-2 flex flex-col items-end gap-2">
      <CommentEditTextarea className={cn(inputVariants(), "min-h-[60px]")} />

      <div className="flex space-x-2">
        <CommentEditActions.CancelButton
          className={editorButtonVariants({ size: "xs", variant: "outline" })}
        >
          Cancel
        </CommentEditActions.CancelButton>

        <CommentEditActions.SaveButton
          className={editorButtonVariants({ size: "xs", variant: "default" })}
        >
          Save
        </CommentEditActions.SaveButton>
      </div>
    </div>
  )
}
