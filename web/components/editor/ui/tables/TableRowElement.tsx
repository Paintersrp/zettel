import { PlateElement } from "@udecode/plate-common"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"

export const TableRowElement = withRef<
  typeof PlateElement,
  {
    hideBorder?: boolean
  }
>(({ children, hideBorder, ...props }, ref) => {
  return (
    <PlateElement
      asChild
      className={cn("h-full", hideBorder && "border-none")}
      ref={ref}
      {...props}
    >
      <tr>{children}</tr>
    </PlateElement>
  )
})
