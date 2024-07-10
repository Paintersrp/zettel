"use client"

import { type FC } from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { useSidePanel } from "@/app/(app)/state/sidePanel"

export const RecentActivitySkeleton: FC = () => {
  const sidePanel = useSidePanel()

  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-40 mb-1 bg-accent" />
        <Skeleton className="h-4 w-48 bg-accent" />
      </CardHeader>
      <CardContent
        className={cn(
          sidePanel.currentState.isOpen
            ? "grid grid-cols-1 xl:grid-cols-2 gap-1.5"
            : "grid grid-cols-1 lg:grid-cols-2 gap-1.5"
        )}
      >
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-accent py-2 rounded px-2 h-14"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col w-full justify-between">
                  <Skeleton className="h-4 w-3/4 mb-2 bg-card" />
                  <Skeleton className="h-3 w-1/2 bg-card" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full bg-card" />
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  )
}

export default RecentActivitySkeleton
