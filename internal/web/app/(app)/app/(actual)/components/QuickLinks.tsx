import { type FC } from "react"
import Link from "next/link"
import {
  Calendar,
  FileText,
  Link as LinkIcon,
  Plus,
  Search,
  Settings,
  Tag,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/variants/button"

const links = [
  { to: "/app/notes/create", icon: Plus, text: "Create Note" },
  { to: "/app/notes", icon: FileText, text: "All Notes" },
  { to: "/app/notes/tags", icon: Tag, text: "Manage Tags" },
  { to: "/app/vaults", icon: Search, text: "All Vaults" },
  { to: "/app/tasks", icon: Calendar, text: "Tasks" },
  { to: "/app/account/profile", icon: Settings, text: "Settings" },
]

export const QuickLinks: FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LinkIcon className="size-5 text-primary" />
          <span className="text-center w-full">Quick Links</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            href={link.to}
            className={buttonVariants({
              variant: "ghost",
              size: "sm",
              className:
                "justify-between w-full !bg-accent hover:!bg-primary/30",
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
