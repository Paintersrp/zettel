import { forwardRef } from "react"
import type { PlateContentProps } from "@udecode/plate-common"
import { PlateContent } from "@udecode/plate-common"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/utils/cn"

const editorVariants = cva(
  cn(
    "relative overflow-x-auto whitespace-pre-wrap break-words",
    "w-full rounded-md bg-card px-6 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold"
  ),
  {
    defaultVariants: {
      focusRing: true,
      size: "sm",
      variant: "outline",
    },
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focusRing: {
        false: "",
        true: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      },
      focused: {
        true: "ring-2 ring-ring ring-offset-2",
      },
      size: {
        lg: "text-lg",
        md: "text-base",
        sm: "text-sm",
      },
      variant: {
        ghost: "",
        outline: "border border-input",
      },
    },
  }
)

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants> & { containerClass?: string }

const Editor = forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      containerClass,
      disabled,
      focusRing,
      focused,
      readOnly,
      size,
      variant,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative w-full", containerClass)} ref={ref}>
        <PlateContent
          aria-disabled={disabled}
          className={cn(
            editorVariants({
              disabled,
              focusRing,
              focused,
              size,
              variant,
            }),
            "h-full",
            className
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          {...props}
        />
      </div>
    )
  }
)
Editor.displayName = "Editor"

export { Editor }
