import { Link, useRouterState } from "@tanstack/react-router"

import { cn } from "@/lib/utils"

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

const Sidebar = ({ className, items, ...props }: SidebarProps) => {
  const router = useRouterState()
  const pathname = router.location.pathname

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 ml-4",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex gap-4 items-center justify-between px-4 py-2 text-sm text-default rounded hover:bg-contrast",
            pathname === item.href
              ? "bg-contrast hover:bg-contrast"
              : "hover:bg-contrast hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

export default Sidebar
