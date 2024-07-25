import {
  ListStyleType,
  useIndentListToolbarButton,
  useIndentListToolbarButtonState,
} from "@udecode/plate-indent-list"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const IndentListToolbarButton = withRef<
  typeof ToolbarButton,
  {
    nodeType?: ListStyleType
  }
>(({ nodeType = ListStyleType.Disc }, ref) => {
  const state = useIndentListToolbarButtonState({ nodeType })
  const { props } = useIndentListToolbarButton(state)

  return (
    <ToolbarButton
      ref={ref}
      tooltip={
        nodeType === ListStyleType.Disc ? "Bulleted List" : "Numbered List"
      }
      {...props}
    >
      {nodeType === ListStyleType.Disc ? <Icons.ul /> : <Icons.ol />}
    </ToolbarButton>
  )
})
