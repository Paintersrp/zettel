"use client"

import { Editor } from "@/components/editor/ui/Editor"

import "./ContentEditor.css"

export const ContentEditor = () => {
  return (
    <Editor
      focusRing={false}
      size="md"
      placeholder=""
      variant="ghost"
      containerClass="h-full"
    />
  )
}

export default ContentEditor
