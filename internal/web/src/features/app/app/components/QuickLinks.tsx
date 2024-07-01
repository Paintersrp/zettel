import { type FC } from "react"
import { Link } from "@tanstack/react-router"
import { Plus, Search, Tag } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/variants/button"

export const QuickLinks: FC = () => {
  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link
            to="/app/notes/create"
            className={buttonVariants({
              variant: "outline",
              className: "w-full justify-start",
            })}
          >
            <Plus className="mr-2 h-4 w-4" /> Create Note
          </Link>
          <Link
            to="/app/notes"
            className={buttonVariants({
              variant: "outline",
              className: "w-full justify-start",
            })}
          >
            <Tag className="mr-2 h-4 w-4" /> All Notes
          </Link>
          <Link
            to="/app/vaults"
            className={buttonVariants({
              variant: "outline",
              className: "w-full justify-start",
            })}
          >
            <Search className="mr-2 h-4 w-4" /> All Vaults
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
