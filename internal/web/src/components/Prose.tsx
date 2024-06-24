import { forwardRef, HTMLAttributes } from "react"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const proseVariants = cva(
  "text-muted prose dark:prose-invert dark:prose-headings:text-heading prose-headings:font-heading prose-headings:leading-tighter prose-headings:tracking-tighter prose-a:text-primary dark:prose-a:text-primary prose-img:rounded-md prose-img:shadow-lg prose-headings:scroll-mt-[80px] border-border prose-h1:text-2xl prose-h1:mt-2 prose-h2:mt-2 prose-headings:font-semibold prose-p:text-sm",
  {
    variants: {
      variant: {
        lg: "min-w-full prose-sm md:prose-base prose-pre:border-border prose-pre:border",
        sm: "px-4 py-2 prose-sm",
      },
    },
    defaultVariants: {
      variant: "sm",
    },
  }
)

export interface ProseProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof proseVariants> {}

const Prose = forwardRef<HTMLHeadingElement, ProseProps>(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <div
        className={cn(proseVariants({ variant, className }))}
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
