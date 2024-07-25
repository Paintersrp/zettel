"use client"

import {
  CommentProvider,
  CommentsPositioner,
  SCOPE_ACTIVE_COMMENT,
  useFloatingCommentsContentState,
  useFloatingCommentsState,
} from "@udecode/plate-comments"
import { PortalBody } from "@udecode/plate-common"

import { cn } from "@/utils/cn"
import { popoverVariants } from "@/components/ui/Popover"

import { CommentCreateForm } from "./CommentCreateForm"
import { CommentItem } from "./CommentItem"
import { CommentReplyItems } from "./CommentReplyItems"

export type FloatingCommentsContentProps = {
  disableForm?: boolean
}

export function CommentsPopoverContent(props: FloatingCommentsContentProps) {
  const { disableForm } = props

  const { activeCommentId, hasNoComment, myUserId, ref } =
    useFloatingCommentsContentState()

  return (
    <CommentProvider
      id={activeCommentId}
      key={activeCommentId}
      scope={SCOPE_ACTIVE_COMMENT}
    >
      <div className={cn(popoverVariants(), "relative w-[310px]")} ref={ref}>
        {!hasNoComment && (
          <>
            <CommentItem commentId={activeCommentId} key={activeCommentId} />

            <CommentReplyItems />
          </>
        )}

        {!!myUserId && !disableForm && <CommentCreateForm />}
      </div>
    </CommentProvider>
  )
}

export function CommentsPopover() {
  const { activeCommentId, loaded } = useFloatingCommentsState()

  if (!loaded || !activeCommentId) return null

  return (
    <PortalBody>
      <CommentsPositioner className="absolute z-50 w-[418px] pb-4">
        <CommentsPopoverContent />
      </CommentsPositioner>
    </PortalBody>
  )
}
