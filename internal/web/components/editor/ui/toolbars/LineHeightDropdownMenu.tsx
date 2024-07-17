import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu"
import {
  useLineHeightDropdownMenu,
  useLineHeightDropdownMenuState,
} from "@udecode/plate-line-height"

import { useOpenState } from "@/hooks/useOpenState"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { ToolbarButton } from "@/components/ui/Toolbar"
import { Icons } from "@/components/editor/ui/Icons"

export function LineHeightDropdownMenu({ ...props }: DropdownMenuProps) {
  const openState = useOpenState()
  const state = useLineHeightDropdownMenuState()
  const { radioGroupProps } = useLineHeightDropdownMenu(state)

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          isDropdown
          pressed={openState.open}
          tooltip="Line height"
        >
          <Icons.lineHeight />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          {...radioGroupProps}
        >
          {state.values.map((_value) => (
            <DropdownMenuRadioItem
              className="min-w-[180px]"
              key={_value}
              value={_value}
            >
              {_value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
