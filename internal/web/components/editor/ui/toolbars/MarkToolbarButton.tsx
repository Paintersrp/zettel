"use client"

import {
  useMarkToolbarButton,
  useMarkToolbarButtonState,
} from "@udecode/plate-common"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"

export const MarkToolbarButton = withRef<
  typeof ToolbarButton,
  {
    clear?: string | string[]
    nodeType: string
  }
>(({ clear, nodeType, ...rest }, ref) => {
  const state = useMarkToolbarButtonState({ clear, nodeType })
  const { props } = useMarkToolbarButton(state)

  return <ToolbarButton ref={ref} {...props} {...rest} />
})
