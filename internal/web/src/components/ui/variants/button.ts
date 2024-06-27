import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center transition duration-150 ease-in justify-center rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/80",
        slate:
          "dark:bg-slate-700 bg-slate-400 text-white hover:bg-slate-400/90 dark:hover:bg-slate-700/90",
        outline:
          "border bg-popover hover:bg-accent hover:text-accent-foreground",
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        tertiary: "bg-tertiary text-default hover:bg-tertiary/90",
        accent:
          "bg-accent text-accent-foreground dark:hover:bg-accent/80 hover:bg-accent/80",
        destructive: "bg-error text-error-foreground hover:bg-error-hover",
        destructiveInvert:
          "hover:bg-destructive hover:text-destructive-foreground bg-transparent text-destructive transition-all duration-300",
        success: "bg-success text-success-foreground hover:bg-success-hover",
        info: "bg-info text-info-foreground hover:bg-info-hover",
        ghost: "bg-card hover:bg-accent",
        link: "underline-offset-4  hover:underline text-primary",
        icon: "rounded-full bg-white text-gray-600 transition duration-100 hover:scale-105",
      },
      size: {
        default: "h-10 py-2 px-4",
        xxs: "px-2 rounded",
        xs: "h-8 px-2 rounded text-[0.8rem]",
        sm: "h-9 px-3 rounded text-[0.8rem]",
        lg: "h-11 px-8 rounded",
        icon: "h-10 w-10",
        iconSm: "h-9 w-9 px-1.5 py-1.5",
        iconXs: "h-7 w-7",
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

export { buttonVariants }
