import React, { ButtonHTMLAttributes } from "react"
import { Link, LinkProps } from "@tanstack/react-router"
import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const menuItemVariants = cva(
  "group flex items-center justify-between gap-4 rounded text-default hover:bg-contrast-hover transition-all duration-100",
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

export interface MenuLinkProps
  extends LinkProps,
    VariantProps<typeof menuItemVariants> {
  children: React.ReactNode
  className?: string
}

const MenuLink: React.FC<MenuLinkProps> = ({
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

MenuLink.displayName = "MenuLink"

export interface MenuButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof menuItemVariants> {
  children: React.ReactNode
  className?: string
}

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
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

MenuButton.displayName = "MenuButton"

export { MenuLink, MenuButton }
