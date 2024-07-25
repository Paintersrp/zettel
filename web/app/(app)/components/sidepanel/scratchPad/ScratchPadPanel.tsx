"use client"

import { FC, Suspense } from "react"

import { Loading } from "@/components/Loading"

import ScratchPadEditor from "./ScratchPadEditor"
import ScratchPadToolbar from "./ScratchPadToolbar"

export const ScratchPadPanel: FC = () => {
  return (
    <div className="flex flex-col h-full">
      <ScratchPadToolbar />
      <div className="flex-grow relative h-full">
        <Suspense fallback={<Loading />}>
          <ScratchPadEditor />
        </Suspense>
      </div>
    </div>
  )
}

export default ScratchPadPanel
