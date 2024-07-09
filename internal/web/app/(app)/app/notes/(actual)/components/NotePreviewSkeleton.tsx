import { Skeleton } from "@/components/ui/Skeleton"

export const NotePreviewSkeleton = () => {
  return (
    <div className="px-4 py-6 font-semibold min-h-[77vh] max-h-[77vh] rounded space-y-4">
      <div>
        <Skeleton className="h-8 w-2/3 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
      </div>
      <div className="pl-4 border-l-4 border-primary">
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 bg-card" />
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-card" />
      <div>
        <div className="space-y-2 pl-6">
          <Skeleton className="h-6 w-1/2 mb-4 bg-card" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-3/4 bg-card" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-2/3 bg-card" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4 bg-card" />
            <Skeleton className="h-4 w-1/2 bg-card" />
          </div>
        </div>
      </div>

      <Skeleton className="h-0.5 w-full mb-2 bg-card" />
      <div>
        <Skeleton className="h-6 w-1/2 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
      </div>
      <div className="pl-4 border-l-4 border-primary py-2">
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 bg-card" />
      </div>
      <div>
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
        <Skeleton className="h-4 w-full mb-2 bg-card" />
        <Skeleton className="h-4 w-3/4 mb-4 bg-card" />
      </div>
    </div>
  )
}
