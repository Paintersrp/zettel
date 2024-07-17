"use client"

import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { withCn } from "@/utils/withCn"
import { withProps } from "@/utils/withProps"
import { Tooltip, TooltipPortal, TooltipTrigger } from "@/components/ui/Tooltip"

export const TooltipContent = withCn(
  withProps(TooltipPrimitive.Content, {
    sideOffset: 4,
  }),
  "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
)

export function withTooltip<
  T extends React.ComponentType<any> | keyof HTMLElementTagNameMap,
>(Component: T) {
  return forwardRef<
    ElementRef<T>,
    {
      tooltip?: ReactNode
      tooltipContentProps?: Omit<
        ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
        "children"
      >
      tooltipProps?: Omit<
        ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>,
        "children"
      >
    } & React.ComponentPropsWithoutRef<T>
  >(function ExtendComponent(
    { tooltip, tooltipContentProps, tooltipProps, ...props },
    ref
  ) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])

    const component = <Component ref={ref} {...(props as any)} />

    if (tooltip && mounted) {
      return (
        <Tooltip {...tooltipProps}>
          <TooltipTrigger asChild>{component}</TooltipTrigger>

          <TooltipPortal>
            <TooltipContent {...tooltipContentProps}>{tooltip}</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      )
    }

    return component
  })
}
