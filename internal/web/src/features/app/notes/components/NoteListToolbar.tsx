import { FC, memo } from "react"
import { Filter, Search, SortAsc } from "lucide-react"

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

export const NoteListToolbar: FC<NoteListToolbarProps> = memo(({ search }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-grow">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search notes..." className="pl-10 pr-4 py-2" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              {search.filter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Untagged</DropdownMenuItem>
            <DropdownMenuItem>Orphans</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Date Created</DropdownMenuItem>
            <DropdownMenuItem>Date Modified</DropdownMenuItem>
            <DropdownMenuItem>Alphabetical</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* <div className="flex items-center gap-2"> */}
      {/*   <Button */}
      {/*     variant={viewMode === "grid" ? "default" : "outline"} */}
      {/*     size="sm" */}
      {/*     onClick={() => setViewMode("grid")} */}
      {/*   > */}
      {/*     <Grid className="w-4 h-4" /> */}
      {/*   </Button> */}
      {/*   <Button */}
      {/*     variant={viewMode === "list" ? "default" : "outline"} */}
      {/*     size="sm" */}
      {/*     onClick={() => setViewMode("list")} */}
      {/*   > */}
      {/*     <List className="w-4 h-4" /> */}
      {/*   </Button> */}
      {/*   <Button variant="primary" size="sm"> */}
      {/*     <Plus className="w-4 h-4 mr-2" /> */}
      {/*     New Note */}
      {/*   </Button> */}
      {/* </div> */}
    </div>
  )
})

export default NoteListToolbar
