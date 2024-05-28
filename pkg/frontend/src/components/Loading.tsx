import type { FC } from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  iconClass?: string
}

const Loading: FC<LoadingProps> = ({ className, iconClass }) => {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <Loader2
        className={cn(
          "mr-2 h-12 w-12 mt-4 text-primary animate-spin",
          iconClass
        )}
      />
    </div>
  )
}

export { Loading }