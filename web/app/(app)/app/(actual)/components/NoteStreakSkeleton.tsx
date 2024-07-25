import { FC } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"

export const NoteStreakSkeleton: FC = () => {
  return (
    <Card>
      <CardHeader className="!pb-2">
        <CardTitle className="flex items-center">
          <Skeleton className="size-5 h-5 w-5 mr-2 bg-primary/30 !rounded-full" />
          <div className="w-full flex justify-center items-center">
            <Skeleton className="h-5 w-2/3 bg-accent" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Skeleton className="mt-1 h-8 w-8 mx-auto bg-primary/30 !rounded-full" />
          <Skeleton className="mt-2 h-4 w-24 mx-auto bg-accent" />
        </div>
      </CardContent>
    </Card>
  )
}
