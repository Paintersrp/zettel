import { memo } from "react"

import { withCn } from "@/utils/withCn"
import { Toolbar } from "@/components/ui/Toolbar"

export const FixedToolbar = memo(
  withCn(
    Toolbar,
    "supports-backdrop-blur:bg-background/60 sticky left-0 top-0 z-50 w-full justify-between overflow-x-auto rounded-t-lg border-b border-b-border bg-accent backdrop-blur min-h-11"
  )
)
