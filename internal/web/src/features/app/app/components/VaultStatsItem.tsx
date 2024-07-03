import { FC } from "react"
import { Link } from "@tanstack/react-router"

import { Badge } from "@/components/ui/Badge"

export interface VaultStatItemProps {
  title: string
  value: string | number
  icon: React.ElementType
  linkTo: string
  search?: Record<string, string>
  subtitle?: string
}

export const VaultStatItem: FC<VaultStatItemProps> = ({
  title,
  value,
  icon: Icon,
  linkTo,
  search,
  subtitle,
}) => (
  <Link
    to={linkTo}
    search={search}
    className="bg-card p-3 rounded hover:bg-primary/20 sine-free duration-200"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className="mr-2 h-5 w-5 text-primary" />
        <div>
          <p className="text-foreground">{title}</p>
          {subtitle && (
            <p
              className="text-xs text-muted-foreground truncate"
              title={subtitle}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <Badge className="bg-primary/20 text-foreground">{value}</Badge>
    </div>
  </Link>
)
