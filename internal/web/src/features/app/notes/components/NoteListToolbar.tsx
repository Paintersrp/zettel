import { memo, type FC } from "react"
import { Link } from "@tanstack/react-router"
import { CirclePlus, Table } from "lucide-react"

import { TooltipWrapper } from "@/components/ui/Tooltip"
import { buttonVariants } from "@/components/ui/variants/button"
import { TabbedLinkItem, TabbedLinks } from "@/components/TabbedLinks"

interface NoteListToolbarProps {
  search: { filter: string }
}

const linkClass = buttonVariants({
  size: "iconSm",
  className: "hover:bg-page bg-contrast-hover group",
})

export const NoteListToolbar: FC<NoteListToolbarProps> = memo(({ search }) => {
  return (
    <div className="flex gap-2 items-center justify-between pb-2 px-1 h-12">
      <div className="space-x-1">
        <TooltipWrapper side="top" content="Table View">
          <Link
            to="/app/notes/table"
            search={{
              filter: search.filter,
            }}
            className={linkClass}
          >
            <span className="flex gap-2 items-center text-sm">
              <Table className="text-primary size-4" />
              <span className="sr-only">Table View</span>
            </span>
          </Link>
        </TooltipWrapper>
        <TooltipWrapper side="top" content="Create Note">
          <Link to="/app/notes/create" className={linkClass}>
            <span className="flex gap-2 items-center text-sm text-default">
              <CirclePlus className="text-primary size-4" />
              <span className="sr-only">Create Note</span>
            </span>
          </Link>
        </TooltipWrapper>
      </div>

      <TabbedLinks>
        <TabbedLinkItem value="all" to="/app/notes" search={{ filter: "all" }}>
          All
        </TabbedLinkItem>
        <TabbedLinkItem
          value="untagged"
          to="/app/notes"
          search={{ filter: "untagged" }}
        >
          Untagged
        </TabbedLinkItem>
        <TabbedLinkItem
          value="orphans"
          to="/app/notes"
          search={{ filter: "orphans" }}
        >
          Orphans
        </TabbedLinkItem>
      </TabbedLinks>
    </div>
  )
})

export default NoteListToolbar
