"use client"

import {
  Resizable as ResizablePrimitive,
  ResizeHandle as ResizeHandlePrimitive,
} from "@udecode/plate-resizable"
import { cva } from "class-variance-authority"

import { cn } from "@/utils/cn"
import { withRef } from "@/utils/withRef"
import { withVariants } from "@/utils/withVariants"

export const mediaEditorResizeHandleVariants = cva(
  cn(
    "top-0 flex w-6 select-none flex-col justify-center",
    "after:flex after:h-16 after:w-[3px] after:rounded-[6px] after:bg-ring after:opacity-0 after:content-['_'] group-hover:after:opacity-100"
  ),
  {
    variants: {
      direction: {
        left: "-left-3 -ml-3 pl-3",
        right: "-right-3 -mr-3 items-end pr-3",
      },
    },
  }
)

const editorResizeHandleVariants = cva(cn("absolute z-40"), {
  variants: {
    direction: {
      bottom: "w-full cursor-row-resize",
      left: "h-full cursor-col-resize",
      right: "h-full cursor-col-resize",
      top: "w-full cursor-row-resize",
    },
  },
})

const EditorResizeHandleVariants = withVariants(
  ResizeHandlePrimitive,
  editorResizeHandleVariants,
  ["direction"]
)

export const EditorResizeHandle = withRef<typeof ResizeHandlePrimitive>(
  (props, ref) => (
    <EditorResizeHandleVariants
      direction={props.options?.direction}
      ref={ref}
      {...props}
    />
  )
)

const editorResizableVariants = cva("", {
  variants: {
    align: {
      center: "mx-auto",
      left: "mr-auto",
      right: "ml-auto",
    },
  },
})

export const EditorResizable = withVariants(
  ResizablePrimitive,
  editorResizableVariants,
  ["align"]
)
