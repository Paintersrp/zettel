import type { FC, HTMLAttributes } from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import badgeVariants from "@/components/ui/variants/badge"

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge: FC<BadgeProps> = ({ className, variant, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }
