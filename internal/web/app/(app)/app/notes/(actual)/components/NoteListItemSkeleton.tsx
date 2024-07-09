import { Skeleton } from "@/components/ui/Skeleton"

export const NoteListItemSkeleton = () => {
  return (
    <div className="py-4 w-full px-6 flex flex-col gap-2 bg-card border-b">
      <div className="flex justify-between items-start">
        <Skeleton className="h-7 w-3/4" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex gap-2 mt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}
