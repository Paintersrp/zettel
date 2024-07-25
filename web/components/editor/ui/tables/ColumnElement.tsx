import { PlateElement, useElement, withHOC } from "@udecode/plate-common"
import type { TColumnElement } from "@udecode/plate-layout"
import { ResizableProvider } from "@udecode/plate-resizable"
import { useReadOnly } from "slate-react"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"

export const ColumnElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ children, className, ...props }, ref) => {
    const readOnly = useReadOnly()
    const { width } = useElement<TColumnElement>()

    return (
      <PlateElement
        className={cn(
          className,
          !readOnly && "rounded-lg border border-dashed p-1.5"
        )}
        ref={ref}
        style={{ width }}
        {...props}
      >
        {children}
      </PlateElement>
    )
  })
)
