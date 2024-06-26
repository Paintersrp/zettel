import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

export const VaultCardSkeleton = () => {
  const { openPanel } = useSidePanel()

  return (
    <Card className="relative transition-all duration-300 bg-accent">
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-6 w-2/3 bg-card" />
            <Skeleton className="h-4 w-full bg-card" />
            <Skeleton className="h-4 w-1/2 bg-card" />
          </div>
          <Skeleton className="h-6 w-7 rounded bg-card" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1">
          <Skeleton className="size-5 rounded bg-card" />
          <Skeleton className="h-5 w-1/5 bg-card" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            size="sm"
            variant="ghost"
            className="gap-1 group hover:bg-primary sine items-center p-1.5 rounded-full"
            onClick={() => openPanel("vault", "creation")}
          >
            <PlusCircle className="size-6 sine group-hover:text-foreground text-primary" />
            <span className="sr-only">Create Vault</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default VaultCardSkeleton
