import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type ReactNode,
} from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    side="bottom"
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      `
        z-50 
        overflow-hidden 
        rounded-md 
        border
        bg-popover 
        px-3 
        py-1.5 
        text-sm 
        text-popover-foreground 
        shadow-md 

        animate-in 
        fade-in-0 
        zoom-in-95 

        data-[state=closed]:animate-out 
        data-[state=closed]:fade-out-0 
        data-[state=closed]:zoom-out-95 
        data-[side=bottom]:slide-in-from-top-2 
        data-[side=left]:slide-in-from-right-2 
        data-[side=right]:slide-in-from-left-2 
        data-[side=top]:slide-in-from-bottom-2
      `,
      className
    )}
    {...props}
  />
))

interface TooltipWrapperProps {
  children: ReactNode
  content: string | ReactNode
}

const TooltipWrapper: FC<TooltipWrapperProps> = ({ children, content }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="dark:text-white text-dark font-normal">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}

TooltipContent.displayName = TooltipPrimitive.Content.displayName

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipWrapper,
}
