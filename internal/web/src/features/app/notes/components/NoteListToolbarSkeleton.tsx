import type { FC } from "react"

import { Skeleton } from "@/components/ui/Skeleton"

export const NoteListToolbarSkeleton: FC = () => {
  return (
    <div className="flex items-center gap-2 flex-grow">
      <div className="relative flex-grow max-w-md h-9">
        <Skeleton className="pl-8 pr-4 py-2 h-9 w-full bg-card" />
      </div>
      <Skeleton className="min-w-[110px] h-9 w-[110px] rounded bg-card" />
    </div>
  )
}

export default NoteListToolbarSkeleton
