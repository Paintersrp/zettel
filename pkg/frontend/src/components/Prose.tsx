import { forwardRef, HTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const proseVariants = cva("", {
  variants: {
    variant: {
      lg: "min-w-full md:prose-base prose-pre:border-border prose-pre:border",
      sm: "p-4",
    },
  },
  defaultVariants: {
    variant: "sm",
  },
})

export interface ProseProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}

const Prose = forwardRef<HTMLHeadingElement, ProseProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(
          proseVariants({ variant, className }),
          "text-muted prose prose-sm dark:prose-invert dark:prose-headings:text-heading prose-headings:font-heading prose-headings:leading-tighter prose-headings:tracking-tighter prose-headings:font-bold prose-a:text-primary dark:prose-a:text-primary prose-img:rounded-md prose-img:shadow-lg prose-headings:scroll-mt-[80px] border-border"
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Prose.displayName = "Prose"

export { Prose }
