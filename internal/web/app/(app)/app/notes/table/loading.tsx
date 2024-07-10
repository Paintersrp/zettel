import DataTableSkeleton from "@/components/ui/data-tables/DataTableSkeleton"
import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"

import { NotesTableToolbarSkeleton } from "./components/NotesTableToolbarSkeleton"

const NotesTableLoading = () => {
  return (
    <div className="w-full flex-grow bg-accent">
      <div className="space-y-2 px-4 py-2">
        <Heading title="Notes Table" description="Manage notes for vault" />
      </div>
      <div className="px-4">
        <NotesTableToolbarSkeleton />
      </div>
      <Separator className="mt-4 mb-2" />
      <div className="w-full flex flex-col">
        <div className="px-4 py-2">
          <DataTableSkeleton />
        </div>
      </div>
    </div>
  )
}

export default NotesTableLoading
