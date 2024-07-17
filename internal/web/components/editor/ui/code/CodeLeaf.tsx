"use client"

import { PlateLeaf } from "@udecode/plate-common"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"

export const CodeLeaf = withRef<typeof PlateLeaf>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateLeaf
        asChild
        className={cn(
          "whitespace-pre-wrap rounded-md bg-muted px-[0.3em] py-[0.2em] font-mono text-sm",
          className
        )}
        ref={ref}
        {...props}
      >
        <code>{children}</code>
      </PlateLeaf>
    )
  }
)
