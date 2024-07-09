import { Suspense } from "react"

import { Separator } from "@/components/ui/Separator"
import { Heading } from "@/components/Heading"

import NoteListContainer from "./components/NoteListContainer"
import NoteListSkeleton from "./components/NoteListSkeleton"
import NoteListToolbar from "./components/NoteListToolbar"
import NotesHeading from "./components/NotesHeading"

interface NotesProps {
  searchParams: { filter: string }
}

const Notes = ({ searchParams }: NotesProps) => {
  return (
    <div className="flex flex-col w-full bg-accent max-h-[calc(100%-9rem]">
      <div className="px-2 md:px-4 py-2 space-y-2">
        <Suspense
          fallback={
            <Heading
              title="Vault Notes"
              description="View and manage notes for active vault."
            />
          }
        >
          <NotesHeading />
        </Suspense>

        <NoteListToolbar filter={searchParams.filter ?? "all"} />
      </div>
      <Separator />
      <div className="flex-grow overflow-hidden">
        <Suspense fallback={<NoteListSkeleton />}>
          <NoteListContainer />
        </Suspense>
      </div>
    </div>
  )
}

export default Notes
