import { Heading } from "@/components/Heading"

import NotesTableContainer from "./components/NotesTableContainer"

interface NotesTableProps {
  searchParams: { filter?: string }
}

const NotesTable = ({ searchParams }: NotesTableProps) => {
  return (
    <div className="w-full flex-grow bg-accent">
      <div className="space-y-2 px-4 py-2">
        <Heading title="Notes Table" description="Manage notes for vault" />
      </div>

      <div className="w-full flex flex-col">
        <NotesTableContainer filter={searchParams.filter ?? "all"} />
      </div>
    </div>
  )
}

export default NotesTable
