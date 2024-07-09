"use client"

import { FC, ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppScrollToTop } from "@/components/AppScrollToTop"

interface NoteReadContainerProps {
  children: ReactNode
}

const NoteReadContainer: FC<NoteReadContainerProps> = ({ children }) => {
  const pathname = usePathname()
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollToTop()
    }
  }, [pathname])

  return (
    <>
      <ScrollArea
        viewportRef={scrollAreaRef}
        id="read-view"
        className="h-[calc(100vh-9rem)] max-w-full w-full flex-grow"
      >
        {children}
      </ScrollArea>

      <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
    </>
  )
}

export { NoteReadContainer }
