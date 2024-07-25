"use client"

import {
  useCommentDeleteButton,
  useCommentDeleteButtonState,
  useCommentEditButton,
  useCommentEditButtonState,
} from "@udecode/plate-comments"

import { cn } from "@/utils/cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Icons } from "@/components/editor/ui/Icons"

import { EditorButton } from "../EditorButton"

export function CommentMoreDropdown() {
  const editButtonState = useCommentEditButtonState()
  const { props: editProps } = useCommentEditButton(editButtonState)
  const deleteButtonState = useCommentDeleteButtonState()
  const { props: deleteProps } = useCommentDeleteButton(deleteButtonState)

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <EditorButton
          className={cn("h-6 p-1 text-muted-foreground")}
          variant="ghost"
        >
          <Icons.more className="size-4" />
        </EditorButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem {...editProps}>Edit comment</DropdownMenuItem>
        <DropdownMenuItem {...deleteProps}>Delete comment</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
