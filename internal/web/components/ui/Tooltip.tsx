import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type ReactNode,
} from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/utils/cn"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipPortal = TooltipPrimitive.Portal

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      side="bottom"
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        `
        z-20
        overflow-hidden
        rounded
        border
        border-primary/20
        bg-accent
        px-2
        py-2
        text-sm
        text-popover-foreground
        shadow-md

        animate-in
        fade-in-0
        zoom-in-95

        data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0
        data-[state=closed]:zoom-out-95
        data-[side=bottom]:slide-in-from-top-4
        data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-4
        data-[side=right]:ml-2
        data-[side=top]:slide-in-from-bottom-2
      `,
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))

interface TooltipWrapperProps {
  children: ReactNode
  content: string | ReactNode
  side?: "left" | "right" | "top" | "bottom"
  classes?: {
    content?: string
    text?: string
  }
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({
  children,
  content,
  side = "bottom",
  classes,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        style={{ zIndex: 50 }}
        className={cn("z-50", classes?.content)}
      >
        <p className={cn(classes?.text, "font-medium")}>{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
}
