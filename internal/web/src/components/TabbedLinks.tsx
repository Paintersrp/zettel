import type { FC, HTMLAttributes } from "react"
import { Link, LinkProps, useRouter } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

interface TabbedLinksProps extends HTMLAttributes<HTMLDivElement> {}

const TabbedLinks: FC<TabbedLinksProps> = ({ className, ...props }) => (
  <div
    className={cn(
      "inline-flex h-10 items-center justify-center rounded bg-contrast-hover p-1 text-muted gap-1 sine",
      className
    )}
    {...props}
  />
)

interface TabbedLinkItemProps extends LinkProps {
  className?: string
  value: string
}

const TabbedLinkItem: FC<TabbedLinkItemProps> = ({
  className,
  value,
  ...props
}) => {
  const router = useRouter()
  const search = router.state.location.search as { filter: string }
  const isActive = search.filter === value

  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-2 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-contrast sine",
        isActive && "bg-contrast",
        className
      )}
      {...props}
    />
  )
}

export { TabbedLinks, TabbedLinkItem }
