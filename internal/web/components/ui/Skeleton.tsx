import type { FC, HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("animate-pulse duration-3000 bg-accent rounded", className)}
      {...props}
    />
  )
}

export { Skeleton }
