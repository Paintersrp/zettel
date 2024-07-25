"use client"

import { useCommentAddButton } from "@udecode/plate-comments"

import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export function CommentToolbarButton() {
  const { hidden, props } = useCommentAddButton()

  if (hidden) return null

  return (
    <ToolbarButton tooltip="Comment (⌘+⇧+M)" {...props}>
      <Icons.commentAdd />
    </ToolbarButton>
  )
}
