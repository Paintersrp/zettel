"use client"

import { PlateElement } from "@udecode/plate-common"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        asChild
        className={cn("my-1 border-l-2 pl-6 italic", className)}
        ref={ref}
        {...props}
      >
        <blockquote>{children}</blockquote>
      </PlateElement>
    )
  }
)
