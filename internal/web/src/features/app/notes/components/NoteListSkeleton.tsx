import { FC } from "react"

import { NoteListItemSkeleton } from "./NoteListItemSkeleton"

interface NoteListSkeletonProps {
  count?: number
}

export const NoteListSkeleton: FC<NoteListSkeletonProps> = ({ count = 10 }) => {
  return Array.from({ length: count }).map((_, index) => (
    <NoteListItemSkeleton key={`skeleton-${index}`} />
  ))
}

export default NoteListSkeleton
