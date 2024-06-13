import React from "react"
import { Link } from "@tanstack/react-router"
import { CirclePlus } from "lucide-react"

import { buttonVariants } from "@/components/ui/Button"
import { TabbedLinkItem, TabbedLinks } from "@/components/TabbedLinks"

interface NotesToolbarProps {}

const NotesToolbar: React.FC<NotesToolbarProps> = () => {
  return (
    <div className="pb-2 flex flex-col gap-2 md:flex-row items-start md:items-center justify-between">
      <TabbedLinks>
        <TabbedLinkItem value="all" to="/notes" search={{ filter: "all" }}>
          All
        </TabbedLinkItem>
        <TabbedLinkItem
          value="untagged"
          to="/notes"
          search={{ filter: "untagged" }}
        >
          Untagged
        </TabbedLinkItem>
        <TabbedLinkItem
          value="orphans"
          to="/notes"
          search={{ filter: "orphans" }}
        >
          Orphans
        </TabbedLinkItem>
      </TabbedLinks>
      <Link
        to="/notes/create"
        className={buttonVariants({ size: "sm", variant: "outline" })}
      >
        <span className="flex gap-2 items-center text-sm">
          <CirclePlus className="size-4 text-primary" />
          Create Note
        </span>
      </Link>
    </div>
  )
}

export default NotesToolbar
