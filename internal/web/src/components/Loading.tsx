import type { FC } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  iconClass?: string
}

const Loading: FC<LoadingProps> = ({ className, iconClass }) => {
  return (
    <div
      className={cn(
        "flex w-full h-full justify-center items-center",
        className
      )}
    >
      <Loader2
        className={cn("mr-2 size-24 mt-4 text-primary animate-spin", iconClass)}
      />
    </div>
  )
}

export { Loading }
