"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/Resizable"

import { useSidePanel } from "../lib/sidePanel"

const SidePanelContent = dynamic(() => import("./sidepanel/SidePanelContent"))
const SidePanelToolbar = dynamic(() => import("./sidepanel/SidePanelToolbar"))

const AppPanels = ({ children }: { children: ReactNode }) => {
  const { currentState } = useSidePanel()

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow h-screen">
      <ResizablePanel
        id="main"
        order={1}
        defaultSize={67}
        className="flex flex-col w-full"
      >
        <main className="flex w-full h-full min-h-full">{children}</main>
      </ResizablePanel>
      <ResizableHandle withHandle={currentState.isOpen} />
      {currentState.isOpen && (
        <ResizablePanel
          id="side-panel"
          order={2}
          className="hidden md:flex flex-col bg-accent"
          defaultSize={33}
          maxSize={50}
        >
          <aside className="w-full min-h-screen h-screen flex flex-col">
            <SidePanelToolbar />
            <div className="flex-grow overflow-auto">
              <SidePanelContent />
            </div>
          </aside>
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}

export default AppPanels
