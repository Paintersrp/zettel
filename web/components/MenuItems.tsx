import { ButtonHTMLAttributes, FC, forwardRef } from "react"
import Link, { LinkProps } from "next/link"
import { cn } from "@/utils/cn"
import { cva, VariantProps } from "class-variance-authority"

const menuItemVariants = cva(
  "group flex items-center justify-between gap-4 transition-all duration-100 text-muted-foreground",
  {
    variants: {
      variant: {
        drawer: "p-2.5",
        dropdown: "px-2 py-1.5 w-full",
      },
      palette: {
        primary: "group-hover:text-primary hover:text-priamry",
        secondary: "group-hover:text-secondary hover:text-secondary",
        error: "group-hover:text-red-500 hover:text-red-500",
        success: "group-hover:text-green-500 hover:text-green-500",
        muted: "group-hover:text-muted-foreground hover:text-muted-foreground",
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

const MenuLink: FC<MenuLinkProps> = ({
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

const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
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
