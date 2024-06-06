import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type HTMLAttributes,
} from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/Dialog"

const Command = forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      `
        flex 
        h-full 
        w-full 
        flex-col 
        overflow-hidden
        rounded-md 
        bg-popover 
        text-popover-foreground
      `,
      className
    )}
    {...props}
  />
))

interface CommandDialogProps extends DialogProps {}

const CommandDialog: FC<CommandDialogProps> = ({ children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command
          className={`
            [&_[cmdk-group-heading]]:px-2 
            [&_[cmdk-group-heading]]:font-medium 
            [&_[cmdk-group-heading]]:text-muted-foreground 
            [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 
            [&_[cmdk-group]]:px-2 
            [&_[cmdk-input-wrapper]_svg]:h-5 
            [&_[cmdk-input-wrapper]_svg]:w-5 
            [&_[cmdk-input]]:h-12 
            [&_[cmdk-item]]:px-2 
            [&_[cmdk-item]]:py-3 
            [&_[cmdk-item]_svg]:h-5 
            [&_[cmdk-item]_svg]:w-5
          `}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        `
          flex 
          h-10 
          w-full 
          rounded-md 
          bg-transparent 
          py-3 
          text-[0.8rem] 
          font-medium
          outline-none 
          placeholder:text-muted 

          disabled:cursor-not-allowed 
          disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  </div>
))

const CommandList = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      `
        max-h-[300px] 
        overflow-y-auto 
        overflow-x-hidden
        rounded
      `,
      className
    )}
    {...props}
  />
))

const CommandEmpty = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={`
      py-3 
      text-center 
      text-[0.8rem]
      font-medium
    `}
    {...props}
  />
))

const CommandGroup = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      `
        overflow-hidden 
        p-1 
        text-foreground 
        [&_[cmdk-group-heading]]:px-2 
        [&_[cmdk-group-heading]]:py-1 
        [&_[cmdk-group-heading]]:text-sm 
        [&_[cmdk-group-heading]]:font-semibold 
        [&_[cmdk-group-heading]]:text-default
      `,
      className
    )}
    {...props}
  />
))

const CommandSeparator = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn(
      `
        -mx-1 
        h-px 
        bg-border
      `,
      className
    )}
    {...props}
  />
))

const CommandItem = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none hover:bg-contrast-hover items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-primary-hover data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))

const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        `
          ml-auto 
          text-xs 
          tracking-widest 
          text-muted-foreground
        `,
        className
      )}
      {...props}
    />
  )
}

Command.displayName = CommandPrimitive.displayName
CommandInput.displayName = CommandPrimitive.Input.displayName
CommandList.displayName = CommandPrimitive.List.displayName
CommandEmpty.displayName = CommandPrimitive.Empty.displayName
CommandGroup.displayName = CommandPrimitive.Group.displayName
CommandSeparator.displayName = CommandPrimitive.Separator.displayName
CommandItem.displayName = CommandPrimitive.Item.displayName
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
