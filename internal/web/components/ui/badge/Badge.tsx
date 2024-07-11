import type { FC, HTMLAttributes } from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/utils/cn"

import badgeVariants from "./variants"

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
