import { FC, ReactNode } from "react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"

interface LinkProps extends NextLinkProps {
  children: ReactNode
  className?: string
  disabled?: boolean
}

export const Link: FC<LinkProps> = ({
  children,
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <NextLink
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={`${disabled ? "pointer-events-none" : ""} ${className}`}
      {...rest}
    >
      {children}
    </NextLink>
  )
}

export default Link
