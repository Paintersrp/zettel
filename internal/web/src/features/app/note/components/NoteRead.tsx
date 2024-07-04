import { FC, memo, useEffect } from "react"
import { useRouter } from "@tanstack/react-router"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { NoteWithDetails } from "@/types/app"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { Markdown } from "@/components/Markdown"
import { Prose } from "@/components/Prose"
import { ScrollToTopApp } from "@/components/ScrollToTop"

interface NoteReadProps {
  note: NoteWithDetails
}

const NoteRead: FC<NoteReadProps> = memo(({ note }) => {
  const router = useRouter()
  const pathname = router.state.location.pathname
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollToTop()
    }
  }, [pathname, note.id])

  return (
    <div className="flex w-full relative">
      <ScrollArea
        viewportRef={scrollAreaRef}
        id="read-view"
        className="h-[calc(100vh-9rem)] max-w-full w-full flex-grow"
      >
        <div
          id="note-content"
          className="rounded bg-card sm:px-4 sm:py-2 flex w-full xl:max-w-7xl xl:m-auto"
        >
          <Prose variant="lg" className="w-full flex p-2">
            <Markdown content={note.content} />
          </Prose>
        </div>
      </ScrollArea>
      <ScrollToTopApp visible={isOverThreshold} onClick={scrollToTop} />
    </div>
  )
})

export { NoteRead }
