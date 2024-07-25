import { useOutdentButton } from "@udecode/plate-indent"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const OutdentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useOutdentButton()

    return (
      <ToolbarButton ref={ref} tooltip="Outdent" {...props} {...rest}>
        <Icons.outdent />
      </ToolbarButton>
    )
  }
)
