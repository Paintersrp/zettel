import {
  ELEMENT_UL,
  useListToolbarButton,
  useListToolbarButtonState,
} from "@udecode/plate-list"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const ListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: string
  }
>(({ nodeType = ELEMENT_UL, ...rest }, ref) => {
  const state = useListToolbarButtonState({ nodeType })
  const { props } = useListToolbarButton(state)

  return (
    <ToolbarButton
      ref={ref}
      tooltip={nodeType === ELEMENT_UL ? "Bulleted List" : "Numbered List"}
      {...props}
      {...rest}
    >
      {nodeType === ELEMENT_UL ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  )
})
