import { useColorsCustom, useColorsCustomState } from "@udecode/plate-font"

import { DropdownMenuItem } from "@/components/ui/DropdownMenu"

import { editorButtonVariants } from "../EditorButton"
import type { TColor } from "./ColorDropdownMenu"
import { ColorDropdownMenuItems } from "./ColorDropdownMenuItems"
import { ColorInput } from "./ColorInput"

type ColorsCustomProps = {
  color?: string
  colors: TColor[]
  customColors: TColor[]
  updateColor: (color: string) => void
  updateCustomColor: (color: string) => void
}

export function ColorsCustom({
  color,
  colors,
  customColors,
  updateColor,
  updateCustomColor,
}: ColorsCustomProps) {
  const state = useColorsCustomState({
    color,
    colors,
    customColors,
    updateCustomColor,
  })
  const { inputProps, menuItemProps } = useColorsCustom(state)

  return (
    <div className="flex flex-col gap-4">
      <ColorInput {...inputProps}>
        <DropdownMenuItem
          className={editorButtonVariants({
            isMenu: true,
            variant: "outline",
          })}
          {...menuItemProps}
        >
          CUSTOM
        </DropdownMenuItem>
      </ColorInput>

      <ColorDropdownMenuItems
        color={color}
        colors={state.computedColors}
        updateColor={updateColor}
      />
    </div>
  )
}
