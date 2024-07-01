import React, { useCallback, useEffect, useRef, useState } from "react"
import { OnMount, useMonaco } from "@monaco-editor/react"
import { initVimMode } from "monaco-vim"

import { loadingLazy } from "@/lib/lazy"

import { useScratchpadStore } from "@/features/app/layout/sidepanel/state/scratchPad"

import ScratchPadToolbar from "./ScratchPadToolbar"

const MonacoEditor = loadingLazy(() => import("@monaco-editor/react"))

export const ScratchPadPanel: React.FC = () => {
  const monaco = useMonaco()
  const { content, updateContent, vimEnabled } = useScratchpadStore()
  const editorRef = useRef<any>(null)
  const [wordCount, setWordCount] = useState(0)
  const vimModeRef = useRef<any>(null)

  const onMount: OnMount = useCallback(
    (editor) => {
      editorRef.current = editor
      editor.focus()

      editor.onDidChangeModelContent(() => {
        const model = editor.getModel()
        if (model) {
          const wordCount = model.getValueLength()
          setWordCount(wordCount)
        }
        updateContent(editor.getValue())
      })
    },
    [updateContent]
  )

  useEffect(() => {
    if (monaco) {
      import("monaco-themes/themes/GitHub Dark.json")
        .then((data: any) => {
          monaco.editor.defineTheme("dracula", {
            ...data,
            colors: {
              "editor.foreground": "#ffffff",
              "editor.background": "#201e2e",
              "editor.selectionBackground": "#44475a",
              "editor.lineHighlightBackground": "#44475a",
              "editorCursor.foreground": "#f8f8f0",
              "editorWhitespace.foreground": "#3B3A32",
              "editorIndentGuide.activeBackground": "#9D550FB0",
              "editor.selectionHighlightBorder": "#222218",
            },
          })
        })
        .then((_) => monaco.editor.setTheme("dracula"))
    }
  }, [monaco])

  useEffect(() => {
    if (editorRef.current) {
      const statusNode = document.getElementById("vim-status")
      if (vimEnabled && !vimModeRef.current) {
        vimModeRef.current = initVimMode(editorRef.current, statusNode)
      } else if (!vimEnabled && vimModeRef.current) {
        vimModeRef.current.dispose()
        vimModeRef.current = null
      }
    }
  }, [vimEnabled])

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 bg-secondary">
        <h3 className="text-sm font-medium">Scratchpad</h3>
        <ScratchPadToolbar />
      </div>
      <div className="flex-grow relative h-full">
        <MonacoEditor
          height="100%"
          language="markdown"
          theme="vs-dark"
          value={content}
          options={{
            minimap: { enabled: false },
            glyphMargin: false,
            folding: false,
            hideCursorInOverviewRuler: true,
            lineDecorationsWidth: 2,
            lineNumbersMinChars: 2,
            overviewRulerBorder: false,
            scrollbar: { verticalSliderSize: 4 },
            wordWrap: "on",
            cursorBlinking: "solid",
            fontSize: 13,
          }}
          onMount={onMount}
        />
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
          Words: {wordCount}
        </div>
      </div>
    </div>
  )
}

export default ScratchPadPanel
