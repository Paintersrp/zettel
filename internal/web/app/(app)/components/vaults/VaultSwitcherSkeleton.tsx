import { FC } from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import { VaultIcon } from "@/components/icons"

export const VaultSwitcherSkeleton: FC = () => {
  return (
    <Button
      variant="outline"
      role="combobox"
      size="sm"
      className="justify-between items-center bg-popover hover:bg-primary/20 w-full max-w-[200px] md:max-w-[220px]"
    >
      <span className="mr-2 size-4 text-primary opacity-70">
        <VaultIcon />
      </span>
      <Skeleton className="h-4 w-24 bg-accent" />
      <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-50 text-primary" />
    </Button>
  )
}

export default VaultSwitcherSkeleton
