import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"

import NoteListSkeleton from "./components/NoteListSkeleton"
import NoteListToolbarSkeleton from "./components/NoteListToolbarSkeleton"

const NotesLoading = () => {
  return (
    <div className="flex flex-col w-full bg-accent max-h-[calc(100%-9rem]">
      <div className="px-2 md:px-4 py-2 space-y-2">
        <Heading
          title="Vault Notes"
          description="View and manage notes for active vault."
        />

        <NoteListToolbarSkeleton />
      </div>
      <Separator />
      <div className="flex-grow overflow-hidden">
        <NoteListSkeleton />
      </div>
    </div>
  )
}

export default NotesLoading
