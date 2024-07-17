import {
  MarkerFC,
  useIndentTodoListElement,
  useIndentTodoListElementState,
  type LiFC,
} from "@udecode/plate-indent-list"
import type { TElement } from "@udecode/slate"

import { Checkbox } from "@/components/ui/Checkbox"
import { cn } from "@/utils/cn"

export const TodoMarker: MarkerFC = ({ element }: { element?: TElement }) => {
  const state = useIndentTodoListElementState({ element })
  const { checkboxProps } = useIndentTodoListElement(state)

  return (
    <div contentEditable={false}>
      <Checkbox
        style={{ left: -24, position: "absolute", top: 4 }}
        {...checkboxProps}
      />
    </div>
  )
}

export const TodoLi: LiFC = (props) => {
  const { children, element } = props

  return (
    <span
      className={cn(
        (element.checked as boolean) && "text-muted-foreground line-through"
      )}
    >
      {children}
    </span>
  )
}
