import { HTMLAttributes } from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { cva } from "class-variance-authority"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/utils/cn"
import { withCn } from "@/utils/withCn"
import { withProps } from "@/utils/withProps"
import { withRef } from "@/utils/withRef"
import { withVariants } from "@/utils/withVariants"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = withRef<
  typeof DropdownMenuPrimitive.SubTrigger,
  {
    inset?: boolean
  }
>(({ children, className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-primary/20 data-[state=open]:bg-primary/20",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </DropdownMenuPrimitive.SubTrigger>
))

const DropdownMenuSubContent = withCn(
  DropdownMenuPrimitive.SubContent,
  "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
)

const DropdownMenuContentVariants = withProps(DropdownMenuPrimitive.Content, {
  className: cn(
    "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  ),
  sideOffset: 4,
})

const DropdownMenuContent = withRef<typeof DropdownMenuPrimitive.Content>(
  ({ ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuContentVariants ref={ref} {...props} />
    </DropdownMenuPrimitive.Portal>
  )
)

const menuItemVariants = cva(
  cn(
    "relative flex h-9 cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
    "focus:bg-primary/20 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
  ),
  {
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  }
)

const DropdownMenuItem = withVariants(
  DropdownMenuPrimitive.Item,
  menuItemVariants,
  ["inset"]
)

const DropdownMenuCheckboxItem = withRef<
  typeof DropdownMenuPrimitive.CheckboxItem
>(({ children, className, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    className={cn(
      "relative flex select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "cursor-pointer",
      className
    )}
    ref={ref}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))

const DropdownMenuRadioItem = withRef<
  typeof DropdownMenuPrimitive.RadioItem,
  {
    hideIcon?: boolean
  }
>(({ children, className, hideIcon, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "relative flex select-none text-muted-foreground items-center rounded-sm pl-8 pr-2 text-sm outline-none transition-colors focus:bg-primary/20 focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "h-9 cursor-pointer px-2 data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary",
      className
    )}
    ref={ref}
    {...props}
  >
    {!hideIcon && (
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="size-4 text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
    )}
    {children}
  </DropdownMenuPrimitive.RadioItem>
))

const dropdownMenuLabelVariants = cva(
  cn("select-none px-2 py-1.5 text-sm font-medium"),
  {
    variants: {
      inset: {
        true: "pl-8",
      },
    },
  }
)

const DropdownMenuLabel = withVariants(
  DropdownMenuPrimitive.Label,
  dropdownMenuLabelVariants,
  ["inset"]
)

const DropdownMenuSeparator = withCn(
  DropdownMenuPrimitive.Separator,
  "-mx-1 my-1 h-px bg-border"
)

const DropdownMenuShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
