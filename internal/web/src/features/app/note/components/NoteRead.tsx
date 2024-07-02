import { FC, useEffect, useRef } from "react"
import { useRouter } from "@tanstack/react-router"

import { NoteWithDetails } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"

interface NoteReadProps {
  note: NoteWithDetails
}

const NoteRead: FC<NoteReadProps> = ({ note }) => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [pathname, note.id])

  return (
    <ScrollArea
      ref={scrollAreaRef}
      id="read-view"
      className="flex flex-col gap-4 w-full justify-center items-center relative transition-opacity duration-200 h-[calc(100vh-9rem)]"
    >
      <div className="flex flex-col w-full">
        <div
          id="note-content"
          className="rounded bg-card px-4 py-2 flex w-full"
        >
          <Prose variant="lg">
            <Markdown content={note.content} />
          </Prose>
        </div>
      </div>
    </ScrollArea>
  )
}

export { NoteRead }
