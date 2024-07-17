import { PlateElement } from "@udecode/plate-common"
import {
  useTodoListElement,
  useTodoListElementState,
} from "@udecode/plate-list"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"
import { Checkbox } from "@/components/ui/Checkbox"

export const TodoListElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props
    const state = useTodoListElementState({ element })
    const { checkboxProps } = useTodoListElement(state)

    return (
      <PlateElement
        className={cn("flex flex-row py-1", className)}
        ref={ref}
        {...props}
      >
        <div
          className="mr-1.5 flex select-none items-center justify-center"
          contentEditable={false}
        >
          <Checkbox {...checkboxProps} />
        </div>
        <span
          className={cn(
            "flex-1 focus:outline-none",
            state.checked && "text-muted-foreground line-through"
          )}
          contentEditable={!state.readOnly}
          suppressContentEditableWarning
        >
          {children}
        </span>
      </PlateElement>
    )
  }
)
