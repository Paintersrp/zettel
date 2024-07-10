import { Suspense } from "react"

import { Loading } from "@/components/Loading"
import { preloadGetNote } from "@/app/(app)/lib/getNote"

import { NoteRead } from "./components/NoteRead"
import { NoteTitle } from "./components/NoteTitle"
import { NoteTitleSkeleton } from "./components/NoteTitleSkeleton"

interface NoteProps {
  params: { id: string }
}

// TODO: NoteTitle Skeleton
// TODO: Preload / Cache Pattern Could be used here I think

const Note = async ({ params }: NoteProps) => {
  preloadGetNote(params.id)

  return (
    <div className="w-full max-w-full">
      <Suspense fallback={<NoteTitleSkeleton />}>
        <NoteTitle id={params.id} />
      </Suspense>

      <div className="w-full flex flex-col md:flex-row gap-4 flex-grow">
        <Suspense fallback={<Loading />}>
          <NoteRead id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

export default Note
