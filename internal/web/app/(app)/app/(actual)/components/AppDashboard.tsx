"use client"

import { ReactNode } from "react"

import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppScrollToTop } from "@/components/AppScrollToTop"

export const AppDashboard = ({ children }: { children: ReactNode }) => {
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()

  return (
    <>
      <ScrollArea
        viewportRef={scrollAreaRef}
        id="dashboard-view"
        className="flex flex-col gap-4 w-full justify-center items-center relative transition-opacity duration-200 h-[calc(100vh-3rem)]"
      >
        {children}
      </ScrollArea>
      <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
    </>
  )
}

export default AppDashboard
