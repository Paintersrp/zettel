import { NoteListItemSkeleton } from "./NoteListItemSkeleton"

interface NoteListSkeletonProps {
  count?: number
}

export const NoteListSkeleton = ({ count = 10 }: NoteListSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <NoteListItemSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  )
}

export default NoteListSkeleton
