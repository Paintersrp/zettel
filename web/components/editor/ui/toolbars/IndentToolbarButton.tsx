import { useIndentButton } from "@udecode/plate-indent"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const IndentToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const { props } = useIndentButton()

    return (
      <ToolbarButton ref={ref} tooltip="Indent" {...props} {...rest}>
        <Icons.indent />
      </ToolbarButton>
    )
  }
)
