"use client"

import type { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AccountSidebarItemProps {
  href: string
  title: string
}

export const AccountSidebarItem: FC<AccountSidebarItemProps> = ({
  href,
  title,
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex gap-4 items-center px-4 py-2 text-sm text-default rounded transition ease-in duration-150 justify-start ${isActive ? "bg-primary/20 hover:bg-primary/20" : "hover:bg-primary/10"}`}
    >
      {title}
    </Link>
  )
}

export default AccountSidebarItem
