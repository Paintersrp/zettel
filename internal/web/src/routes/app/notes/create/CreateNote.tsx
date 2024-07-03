import { useCallback, useState } from "react"

import Editor from "@/components/Editor"
import EditorToolbar from "@/components/EditorToolbar"

const CreateNote = () => {
  // TODO: Move most of this logic to a state for the editor
  //       to clean up the creation route logic
  const [vim, setVim] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<number>(13)

  const incrementFontSize = useCallback(
    (type: "up" | "down" | "reset") => {
      let adjustedSize: number

      switch (type) {
        case "up":
        default:
          adjustedSize = fontSize + 1
          break
        case "down":
          adjustedSize = fontSize - 1
          break
        case "reset":
          adjustedSize = 13
          break
      }

      setFontSize(adjustedSize)
    },
    [fontSize]
  )

  const toggleVim = useCallback(() => {
    setVim(!vim)
  }, [vim])

  return (
    <div className="flex flex-col h-full w-full">
      <EditorToolbar
        vim={vim}
        toggleVim={toggleVim}
        incrementFontSize={incrementFontSize}
      />
      <div className="flex-grow relative h-full">
        <Editor vim={vim} fontSize={fontSize} />
      </div>
    </div>
  )
}

export default CreateNote
