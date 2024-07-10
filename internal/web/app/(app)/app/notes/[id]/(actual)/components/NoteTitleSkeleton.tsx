import type { FC } from "react"
import {
  CalendarIcon,
  Info,
  MoreHorizontal,
  TableProperties,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"

export const NoteTitleSkeleton: FC = () => {
  return (
    <div className="w-full px-4 py-2 h-22 bg-accent border-b">
      <div className="flex justify-between w-full">
        <div className="flex items-start gap-4 w-full">
          <div className="w-full flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <CalendarIcon className="size-4 mr-1 text-primary" />
                <Skeleton className="w-24 h-4 bg-card" />
              </div>
              <div className="flex justify-between items-center mt-1">
                <Skeleton className="w-48 h-8 md:h-10 bg-card" />
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <Button variant="outline" size="iconSm" disabled>
              <TableProperties className="size-6 text-primary" />
            </Button>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="iconXs" disabled>
              <Info className="size-5 text-primary" />
            </Button>
            <Button variant="outline" size="iconXs" disabled>
              <MoreHorizontal className="size-5 text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
