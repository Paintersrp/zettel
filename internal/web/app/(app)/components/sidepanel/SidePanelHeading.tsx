import React, { FC, ReactNode } from "react"

import { cn } from "@/utils/cn"

interface SidePanelHeadingProps {
  title: ReactNode | string
  description: ReactNode | string
  classes?: {
    container?: string
    title?: string
    description?: string
  }
}

export const SidePanelHeading: FC<SidePanelHeadingProps> = ({
  title,
  description,
  classes = {},
}) => {
  return (
    <div className={cn("px-4 py-2 border-b bg-accent", classes?.container)}>
      <h2 className={cn("text-xl font-bold text-primary", classes?.title)}>
        {title}
      </h2>
      <div
        className={cn(
          "flex items-center space-x-1 text-sm text-muted-foreground",
          classes?.description
        )}
      >
        {description}
      </div>
    </div>
  )
}

export default SidePanelHeading
