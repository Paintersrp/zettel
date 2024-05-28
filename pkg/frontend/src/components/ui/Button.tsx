import { forwardRef, type ButtonHTMLAttributes } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        slate:
          "dark:bg-slate-700 bg-slate-400 text-white hover:bg-slate-400/90 dark:hover:bg-slate-700/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        accent:
          "bg-accent text-accent-foreground dark:hover:bg-accent/80 hover:bg-accent/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
        destructiveInvert:
          "hover:bg-destructive hover:text-destructive-foreground bg-transparent text-destructive transition-all duration-300",
        success: "bg-success text-success-foreground hover:bg-success/90",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4  hover:underline text-primary",
        icon: "rounded-full bg-white text-gray-600 transition duration-100 hover:scale-105",
      },
      size: {
        default: "h-10 py-2 px-4",
        xs: "px-2 rounded-md",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
        iconSm: "h-7 w-7",
        iconWithText: "h-10 w-16",
      },
      focus: {
        default:
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
        off: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      focus: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      isLoading,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }