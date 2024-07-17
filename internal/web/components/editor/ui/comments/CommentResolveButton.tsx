"use client"

import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from "@udecode/plate-comments"

import { cn } from "@/utils/cn"
import { Icons } from "@/components/editor/ui/Icons"

import { editorButtonVariants } from "../EditorButton"

export function CommentResolveButton() {
  const comment = useComment()!

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        editorButtonVariants({ variant: "ghost" }),
        "h-6 p-1 text-muted-foreground"
      )}
    >
      {comment.isResolved ? (
        <Icons.refresh className="size-4" />
      ) : (
        <Icons.check className="size-4" />
      )}
    </CommentResolveButtonPrimitive>
  )
}
