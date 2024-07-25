import { FC, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import { OnMount, useMonaco } from "@monaco-editor/react"
import { initVimMode } from "monaco-vim"

import { Loading } from "@/components/Loading"
import { useSidePanel } from "@/app/(app)/components/sidepanel/useSidePanel"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"))

interface EditorProps {
  value: string
  onChange: (value: string | undefined) => void
  vim: boolean
  fontSize: number
}

// TODO: Can't resize panel to be larger with note creation page, idk why
// TODO: Lazy Load monaco-vim / OnMount useMonaco

export const Editor: FC<EditorProps> = ({ value, onChange, vim, fontSize }) => {
  const monaco = useMonaco()
  const { currentState } = useSidePanel()
  const editorRef = useRef<unknown | null>(null)
  const [vimOption, setVimOption] = useState<any>()

  const onMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.focus()

    if (vim) {
      const statusNode = document.getElementById("status")
      const vimMode = initVimMode(editor, statusNode)
      setVimOption(vimMode)
    }
  }

  const handleResize = () => {
    if (editorRef.current) {
      // @ts-ignore: Object is possibly 'null'.
      editorRef.current.layout({})
    }
  }

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
        .then((_) => {
          monaco.editor.setTheme("dracula")
        })

      window.addEventListener("resize", handleResize)
    }
  }, [monaco])

  useEffect(() => {
    handleResize()
  }, [currentState.isOpen])

  useEffect(() => {
    if (monaco) {
      const statusNode = document.getElementById("status")

      if (vim) {
        const vimMode = initVimMode(editorRef.current, statusNode)
        setVimOption(vimMode)
      } else {
        if (vimOption) {
          vimOption.dispose()
        }
      }
    }
  }, [vim])

  if (!monaco) {
    return <Loading />
  }

  return (
    <MonacoEditor
      height="100%"
      theme="dracula"
      defaultLanguage="markdown"
      defaultValue=""
      value={value}
      onMount={onMount}
      onChange={onChange}
      className="border-b"
      options={{
        minimap: { enabled: false },
        glyphMargin: false,
        lineDecorationsWidth: 2,
        lineNumbersMinChars: 2,
        scrollbar: { verticalSliderSize: 4 },
        overviewRulerLanes: 0,
        autoIndent: "full",
        wordWrap: "on",
        fontSize: fontSize,
      }}
    />
  )
}

export default Editor
