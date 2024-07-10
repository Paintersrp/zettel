import { FC } from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export const VaultStatsSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-1/4 mb-1 bg-accent" />
        <Skeleton className="h-4 w-1/5 bg-accent" />
      </CardHeader>
      <CardContent className="space-y-6 h-[470px]">
        <div className="grid grid-cols-2 gap-3">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-16 bg-accent" />
            ))}
        </div>
        <div>
          <Skeleton className="h-5 w-1/4 mb-2 bg-accent" />
          <div className="grid grid-cols-7 gap-2">
            {Array(14)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="space-y-1 flex flex-col items-center"
                >
                  <Skeleton className="h-3 w-1/5 bg-accent" />
                  <Skeleton className="h-6 w-1/4 bg-accent !rounded-full" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VaultStatsSkeleton
