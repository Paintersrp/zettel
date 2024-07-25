"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva } from "class-variance-authority"

import { withProps } from "@/utils/withProps"
import { withVariants } from "@/utils/withVariants"

const separatorVariants = cva("shrink-0 bg-border", {
  defaultVariants: {
    orientation: "horizontal",
  },
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
  },
})

export const Separator = withVariants(
  withProps(SeparatorPrimitive.Root, {
    decorative: true,
    orientation: "horizontal",
  }),
  separatorVariants
)
