import { type FC } from "react"
import { Link } from "@tanstack/react-router"
import { Calendar, FileText, Plus, Search, Settings, Tag } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/variants/button"

export const QuickLinks: FC = () => {
  const links = [
    { to: "/app/notes/create", icon: Plus, text: "Create Note" },
    { to: "/app/notes", icon: FileText, text: "All Notes" },
    { to: "/app/notes/tags", icon: Tag, text: "Manage Tags" },
    { to: "/app/vaults", icon: Search, text: "All Vaults" },
    { to: "/app/tasks", icon: Calendar, text: "Tasks" },
    { to: "/app/account/profile", icon: Settings, text: "Settings" },
  ]

  return (
    <Card className="bg-accent">
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className:
                "justify-between w-full bg-primary/30 hover:bg-primary/20",
            })}
          >
            {link.text}
            <link.icon className="size-5 text-primary" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
