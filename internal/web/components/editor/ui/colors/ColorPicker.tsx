"use client"

import { memo } from "react"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"
import { DropdownMenuItem } from "@/components/ui/DropdownMenu"
import { Separator } from "@/components/ui/Separator"

import { editorButtonVariants } from "../EditorButton"
import type { TColor } from "./ColorDropdownMenu"
import { ColorDropdownMenuItems } from "./ColorDropdownMenuItems"
import { ColorsCustom } from "./ColorsCustom"

export const ColorPickerContent = withRef<
  "div",
  {
    clearColor: () => void
    color?: string
    colors: TColor[]
    customColors: TColor[]
    updateColor: (color: string) => void
    updateCustomColor: (color: string) => void
  }
>(
  (
    {
      className,
      clearColor,
      color,
      colors,
      customColors,
      updateColor,
      updateCustomColor,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn("flex flex-col gap-4 p-4", className)}
        ref={ref}
        {...props}
      >
        <ColorsCustom
          color={color}
          colors={colors}
          customColors={customColors}
          updateColor={updateColor}
          updateCustomColor={updateCustomColor}
        />

        <Separator />

        <ColorDropdownMenuItems
          color={color}
          colors={colors}
          updateColor={updateColor}
        />
        {color && (
          <DropdownMenuItem
            className={editorButtonVariants({
              isMenu: true,
              variant: "outline",
            })}
            onClick={clearColor}
          >
            Clear
          </DropdownMenuItem>
        )}
      </div>
    )
  }
)

export const ColorPicker = memo(
  ColorPickerContent,
  (prev, next) =>
    prev.color === next.color &&
    prev.colors === next.colors &&
    prev.customColors === next.customColors
)
