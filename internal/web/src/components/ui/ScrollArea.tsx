import {
  forwardRef,
  Ref,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

interface ScrollAreaProps
  extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  viewportRef?: Ref<HTMLDivElement>
}

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, viewportRef, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(
      `
        relative 
        overflow-hidden
        !inline
      `,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      ref={viewportRef}
      className={`
        h-full 
        w-full 
        rounded-[inherit]
      `}
    >
      {children}
    </ScrollAreaPrimitive.Viewport>

    <ScrollBar />

    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      `
        flex 
        touch-none 
        select-none 
        transition-colors
      `,
      orientation === "vertical" &&
        `
          h-full 
          w-2.5
          border-l 
          border-l-transparent 
          p-[1px]
        `,
      orientation === "horizontal" &&
        `
          h-2.5 
          flex-col 
          border-t           
          border-t-transparent p-[1px]
        `,
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={`
        relative 
        flex-1 
        rounded-full 
        bg-border
      `}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
