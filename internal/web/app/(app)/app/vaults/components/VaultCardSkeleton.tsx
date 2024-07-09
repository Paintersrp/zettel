import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export const VaultCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <Card className="relative transition-all duration-300">
        <CardHeader>
          <div className="flex justify-between w-full gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-6 w-2/3 bg-accent" />
              <Skeleton className="h-4 w-1/2 bg-accent" />
            </div>
            <Skeleton className="h-6 w-7 rounded bg-accent" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            <Skeleton className="size-5 rounded bg-accent" />
            <Skeleton className="h-5 w-1/5 bg-accent" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default VaultCardSkeleton
