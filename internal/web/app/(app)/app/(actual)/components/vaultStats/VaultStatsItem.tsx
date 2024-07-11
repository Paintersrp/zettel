import { FC } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge/Badge"

export interface VaultStatItemProps {
  title: string
  value: string | number
  icon: React.ElementType
  linkTo: string
  subtitle?: string
}

export const VaultStatItem: FC<VaultStatItemProps> = ({
  title,
  value,
  icon: Icon,
  linkTo,
  subtitle,
}) => (
  <Link
    href={linkTo}
    className="bg-accent p-3 rounded hover:bg-primary/30 sine-free duration-200"
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
      <Badge className="bg-primary/30 text-foreground">{value}</Badge>
    </div>
  </Link>
)
