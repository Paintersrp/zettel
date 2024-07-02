import { FC } from "react"

import ScratchPadEditor from "./ScratchPadEditor"
import ScratchPadToolbar from "./ScratchPadToolbar"

export const ScratchPadPanel: FC = () => {
  return (
    <div className="flex flex-col h-full">
      <ScratchPadToolbar />
      <div className="flex-grow relative h-full">
        <ScratchPadEditor />
      </div>
    </div>
  )
}

export default ScratchPadPanel
