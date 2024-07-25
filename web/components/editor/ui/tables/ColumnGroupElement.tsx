import { PropsWithChildren } from "react"
import {
  PlateElement,
  useElement,
  useRemoveNodeButton,
} from "@udecode/plate-common"
import {
  ELEMENT_COLUMN,
  useColumnState,
  useDebouncePopoverOpen,
  type TColumnElement,
} from "@udecode/plate-layout"
import { useReadOnly } from "slate-react"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/Popover"
import { Separator } from "@/components/ui/Separator"
import { Icons } from "@/components/editor/ui/Icons"

import { EditorButton } from "../EditorButton"

export const ColumnGroupElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement className={cn(className, "my-2")} ref={ref} {...props}>
        <ColumnFloatingToolbar>
          <div className={cn("flex size-full gap-4 rounded")}>{children}</div>
        </ColumnFloatingToolbar>
      </PlateElement>
    )
  }
)

export function ColumnFloatingToolbar({ children }: PropsWithChildren) {
  const readOnly = useReadOnly()

  const {
    setDoubleColumn,
    setDoubleSideDoubleColumn,
    setLeftSideDoubleColumn,
    setRightSideDoubleColumn,
    setThreeColumn,
  } = useColumnState()

  const element = useElement<TColumnElement>(ELEMENT_COLUMN)

  const { props: buttonProps } = useRemoveNodeButton({ element })

  const isOpen = useDebouncePopoverOpen()

  if (readOnly) return <>{children}</>

  return (
    <Popover modal={false} open={isOpen}>
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent
        align="center"
        className="w-auto p-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
        side="top"
        sideOffset={10}
      >
        <div className="box-content flex h-9 items-center gap-1 [&_svg]:size-4 [&_svg]:text-muted-foreground">
          <EditorButton onClick={setDoubleColumn} size="sms" variant="ghost">
            <Icons.doubleColumn />
          </EditorButton>
          <EditorButton onClick={setThreeColumn} size="sms" variant="ghost">
            <Icons.threeColumn />
          </EditorButton>
          <EditorButton
            onClick={setRightSideDoubleColumn}
            size="sms"
            variant="ghost"
          >
            <Icons.rightSideDoubleColumn />
          </EditorButton>
          <EditorButton
            onClick={setLeftSideDoubleColumn}
            size="sms"
            variant="ghost"
          >
            <Icons.leftSideDoubleColumn />
          </EditorButton>
          <EditorButton
            onClick={setDoubleSideDoubleColumn}
            size="sms"
            variant="ghost"
          >
            <Icons.doubleSideDoubleColumn />
          </EditorButton>

          <Separator className="my-1" orientation="vertical" />
          <EditorButton size="sms" variant="ghost" {...buttonProps}>
            <Icons.delete />
          </EditorButton>
        </div>
      </PopoverContent>
    </Popover>
  )
}
