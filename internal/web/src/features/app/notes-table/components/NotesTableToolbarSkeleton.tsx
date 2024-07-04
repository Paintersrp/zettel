import { Skeleton } from "@/components/ui/Skeleton"

export const NotesTableToolbarSkeleton = () => (
  <div className="flex items-center justify-between">
    <div className="flex flex-1 items-center space-x-2">
      <Skeleton className="h-8 w-[200px] lg:w-[300px] bg-card" />
      <Skeleton className="h-8 w-[200px] lg:w-[300px] bg-card" />
      <Skeleton className="h-8 w-[100px] bg-card" />
    </div>
    <Skeleton className="h-8 w-[100px] bg-card" />
  </div>
)
