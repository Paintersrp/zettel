import { FC } from "react"
import { Link } from "@tanstack/react-router"
import { Filter, Search } from "lucide-react"

import { capFirst, cn } from "@/lib/utils"

import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "@/components/ui/Input"

interface NoteListToolbarProps {
  search: { filter: string }
}

export const NoteListToolbar: FC<NoteListToolbarProps> = ({ search }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-grow">
        <div className="relative flex-grow max-w-md h-9">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input placeholder="Search notes..." className="pl-8 pr-4 py-2 h-9" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="min-w-[110px] justify-between hover:bg-primary/20"
            >
              <Filter className="size-4 text-primary mr-2" />
              {capFirst(search.filter)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-0.5 max-w-[110px]">
            <DropdownMenuItem asChild>
              <Link
                className={cn(
                  "inline-flex whitespace-nowrap rounded px-2 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 focus:bg-primary/20 sine w-full",
                  search.filter === "all" && "bg-primary/20"
                )}
                to="/app/notes"
                search={{ filter: "all" }}
                disabled={search.filter === "all"}
              >
                All
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className={cn(
                  "inline-flex whitespace-nowrap rounded px-2 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 focus:bg-primary/20 sine w-full",
                  search.filter === "untagged" && "bg-primary/20"
                )}
                to="/app/notes"
                search={{ filter: "untagged" }}
                disabled={search.filter === "untagged"}
              >
                Untagged
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className={cn(
                  "inline-flex whitespace-nowrap rounded px-2 py-1.5 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 focus:bg-primary/20 sine w-full",
                  search.filter === "orphans" && "bg-primary/20"
                )}
                to="/app/notes"
                search={{ filter: "orphans" }}
                disabled={search.filter === "orphans"}
              >
                Orphans
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu> */}
        {/*   <DropdownMenuTrigger asChild> */}
        {/*     <Button */}
        {/*       variant="outline" */}
        {/*       size="sm" */}
        {/*       className="min-w-[110px] justify-between" */}
        {/*     > */}
        {/*       <SortAsc className="size-4 text-primary mr-2" /> */}
        {/*       Sort */}
        {/*     </Button> */}
        {/*   </DropdownMenuTrigger> */}
        {/*   <DropdownMenuContent className="space-y-0.5 max-w-[110px]"> */}
        {/*     <DropdownMenuItem>Date Created</DropdownMenuItem> */}
        {/*     <DropdownMenuItem>Date Modified</DropdownMenuItem> */}
        {/*     <DropdownMenuItem>Alphabetical</DropdownMenuItem> */}
        {/*   </DropdownMenuContent> */}
        {/* </DropdownMenu> */}
      </div>
    </div>
  )
}

export default NoteListToolbar
