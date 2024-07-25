"use client"

import { useEditorRef } from "@udecode/plate-common"

import { Button } from "@/components/ui/button/Button"

import { useTitle } from "./useTitle"

export const BottomButtons = () => {
  const editor = useEditorRef()
  const { title } = useTitle()

  return (
    <div className="w-full flex justify-end px-2">
      <Button
        variant="ghost"
        size="xs"
        className="bg-primary/60 hover:bg-primary/50"
        onClick={() => {
          const content = editor.children
          console.log({ title, content })
        }}
      >
        Submit
      </Button>
    </div>
  )
}

export default BottomButtons
