import {
  useLinkToolbarButton,
  useLinkToolbarButtonState,
} from "@udecode/plate-link"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const LinkToolbarButton = withRef<typeof ToolbarButton>((rest, ref) => {
  const state = useLinkToolbarButtonState()
  const { props } = useLinkToolbarButton(state)

  return (
    <ToolbarButton ref={ref} tooltip="Link" {...props} {...rest}>
      <Icons.link />
    </ToolbarButton>
  )
})
