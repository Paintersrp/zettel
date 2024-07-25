"use client"

import { Children, cloneElement, type ReactElement } from "react"
import { useComposedRef } from "@udecode/plate-common"
import { useColorInput } from "@udecode/plate-font"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"

export const ColorInput = withRef<"input">(
  ({ children, className, value = "#000000", ...props }, ref) => {
    const { childProps, inputRef } = useColorInput()

    return (
      <div className="flex flex-col items-center">
        {Children.map(children, (child) => {
          if (!child) return child

          return cloneElement(child as ReactElement, childProps)
        })}

        <input
          className={cn("size-0 overflow-hidden border-0 p-0", className)}
          ref={useComposedRef(ref, inputRef)}
          type="color"
          value={value}
          {...props}
        />
      </div>
    )
  }
)
