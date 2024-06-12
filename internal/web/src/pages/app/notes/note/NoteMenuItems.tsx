import React, { ButtonHTMLAttributes } from "react"
import { Link, LinkProps } from "@tanstack/react-router"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const menuItemVariants = cva(
  "group flex items-center justify-between gap-4 rounded text-muted hover:bg-contrast-hover transition",
  {
    variants: {
      variant: {
        drawer: "p-2.5",
        dropdown: "px-2 py-1.5 w-full",
      },
      palette: {
        primary: "group-hover:text-primary hover:text-priamry",
        secondary: "group-hover:text-secondary hover:text-secondary",
        error: "group-hover:text-error hover:text-error",
        success: "group-hover:text-success hover:text-success",
        muted: "group-hover:text-muted hover:text-muted",
      },
    },
    defaultVariants: {
      variant: "dropdown",
      palette: "primary",
    },
  }
)

export interface NoteMenuLinkProps
  extends LinkProps,
    VariantProps<typeof menuItemVariants> {
  children: React.ReactNode
  className?: string
}

const NoteMenuLink: React.FC<NoteMenuLinkProps> = ({
  children,
  className,
  variant,
  palette,
  ...props
}) => {
  return (
    <Link
      className={cn(menuItemVariants({ variant, palette, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}

NoteMenuLink.displayName = "NoteMenuLink"

export interface NoteMenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menuItemVariants> {
  children: React.ReactNode
  className?: string
}

const NoteMenuButton = React.forwardRef<HTMLButtonElement, NoteMenuButtonProps>(
  ({ children, className, variant, palette, ...props }, ref) => {
    return (
      <button
        className={cn(menuItemVariants({ variant, palette, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

NoteMenuButton.displayName = "NoteMenuButton"

export { NoteMenuLink, NoteMenuButton }
