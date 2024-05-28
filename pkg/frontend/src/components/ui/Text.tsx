import { forwardRef, type HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textVariants = cva("", {
  variants: {
    variant: {
      default: "dark:text-white text-black",
      blue: "dark:text-blue-400 text-blue-600",
      red: "dark:text-red-500 text-red-600",
      slate: "dark:text-slate-300 text-slate-600",
      muted: "text-muted-foreground",
    },
    type: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "",
    },
    size: {
      default: "",
      base: "text-base",
      xs: "text-[0.925rem]",
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
    },
  },
  defaultVariants: {
    variant: "default",
    type: "p",
    size: "default",
  },
})

export interface TextProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = forwardRef<HTMLHeadingElement, TextProps>(
  (
    { children, className, variant, size, type, asChild = false, ...props },
    ref
  ) => {
    const Comp = type ?? "p"

    return (
      <Comp
        className={cn(textVariants({ variant, type, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Text.displayName = "Text"

export { Text }
