import {
  useIndentTodoToolBarButton,
  useIndentTodoToolBarButtonState,
} from "@udecode/plate-indent-list"

import { withRef } from "@/utils/withRef"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export const IndentTodoToolbarButton = withRef<typeof ToolbarButton>(
  (rest, ref) => {
    const state = useIndentTodoToolBarButtonState({ nodeType: "todo" })
    const { props } = useIndentTodoToolBarButton(state)

    return (
      <ToolbarButton ref={ref} tooltip="Todo" {...props} {...rest}>
        <Icons.todo />
      </ToolbarButton>
    )
  }
)
