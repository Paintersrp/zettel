"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Skeleton } from "@/components/ui/Skeleton"
import { useVaultCreateModal } from "@/app/(app)/state/vaultCreateModal"

export const VaultCardCreateSkeleton = () => {
  const { handleOpen } = useVaultCreateModal()

  return (
    <Card className="relative transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-6 w-2/3 bg-accent" />
          </div>
          <Skeleton className="h-6 w-7 rounded bg-accent" />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 mt-1">
        <Skeleton className="h-4 w-3/4 bg-accent" />
        {/* <div className="flex items-center gap-1"> */}
        {/*   <Skeleton className="size-5 rounded bg-accent" /> */}
        {/*   <Skeleton className="h-5 w-1/5 bg-accent" /> */}
        {/* </div> */}
      </CardContent>
      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1 text-primary hover:text-foreground hover:bg-primary/50 bg-transparent sine items-center p-1.5 rounded-full sine-free duration-200"
          onClick={handleOpen}
        >
          <PlusCircle className="size-6" />
          <span className="sr-only">Create Vault</span>
        </Button>
      </div>
    </Card>
  )
}

export default VaultCardCreateSkeleton
