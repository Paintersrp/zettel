import { Settings } from "lucide-react"

import { preloadGetNote } from "@/lib/note/queries/getNote"

import { NoteEditTitle } from "./components/NoteEditTitle"

// 4.74kb 7/04/24

// TODO: lazy load NoteRead
// TODO: NoteRead LazyLoad Prose / Markdown

interface NoteEditProps {
  params: { id: string }
}

const NoteEdit = async ({ params }: NoteEditProps) => {
  preloadGetNote(params.id)

  return (
    <div className="w-full max-w-full">
      <NoteEditTitle id={params.id} />
      <div className="relative h-[calc(100%-9rem)] flex flex-col justify-center items-center w-full px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4">
            <Settings className="text-primary animate-spin-slow size-16" />
          </div>
          <h1 className="text-4xl font-bold">Work In Progress</h1>
          <p className="text-lg text-muted-foreground text-center">
            This page is currently under construction. Please check back later.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NoteEdit
