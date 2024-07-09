"use client"

import { type FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface DesktopSidebarItemProps {
  icon: React.ReactNode
  to: string
  tooltip: string
}

export const DesktopSidebarItem: FC<DesktopSidebarItemProps> = ({
  icon,
  to,
  tooltip,
}) => {
  const pathname = usePathname()
  const active = pathname === to

  return (
    <TooltipWrapper content={tooltip} side="right">
      <Link
        href={to}
        className="group size-8 bg-accent hover:bg-primary/20 inline-flex items-center duration-150 ease-in justify-center rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
      >
        <span
          className={cn(
            "flex items-center justify-center size-8 group-hover:text-primary text-muted-foreground",
            active && "text-primary"
          )}
        >
          {icon}
        </span>
        <span className="sr-only">{tooltip}</span>
      </Link>
    </TooltipWrapper>
  )
}
