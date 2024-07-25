"use client"

import {
  SCOPE_ACTIVE_COMMENT,
  useCommentReplies,
} from "@udecode/plate-comments"

import { CommentItem } from "./CommentItem"

export function CommentReplyItems() {
  const commentReplies = useCommentReplies(SCOPE_ACTIVE_COMMENT)

  return (
    <>
      {Object.keys(commentReplies).map((id) => (
        <CommentItem commentId={id} key={id} />
      ))}
    </>
  )
}
