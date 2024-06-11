import { Link, useRouterState } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

interface AccountSidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

const AccountSidebar = ({
  className,
  items,
  ...props
}: AccountSidebarProps) => {
  const router = useRouterState()
  const pathname = router.location.pathname

  return (
    <nav
      className={cn(
        "flex flex-col sm:flex-row px-4 gap-1 lg:gap-0 space-y-0 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex gap-4 items-center justify-between px-4 py-2 text-sm text-default rounded hover:bg-contrast transition ease-in duration-150",
            pathname === item.href
              ? "bg-contrast hover:bg-contrast"
              : "hover:bg-contrast",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default AccountSidebar
