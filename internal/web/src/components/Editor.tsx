import React, {
  FC,
  SVGProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { OnMount, useMonaco } from "@monaco-editor/react"
import {
  AArrowDown,
  AArrowUp,
  ALargeSmall,
  Archive,
  Download,
  EyeIcon,
  LucideIcon,
  Redo,
  Save,
  Settings,
  Undo,
} from "lucide-react"
import { initVimMode } from "monaco-vim"

import { loadingLazy } from "@/lib/lazy"
import { cn } from "@/lib/utils"

import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import { VimIcon } from "./icons/Vim"
import { Loading } from "./Loading"
import { Button } from "./ui/Button"
import { Separator } from "./ui/Separator"
import { TooltipWrapper } from "./ui/Tooltip"

const MonacoEditor = loadingLazy(() => import("@monaco-editor/react"))

interface EditorProps {}

export const Editor: React.FC<EditorProps> = () => {
  const monaco = useMonaco()
  const { currentState } = useSidePanel()
  const editorRef = useRef<unknown | null>(null)
  const [value, setValue] = useState<string>("")
  const [vimOption, setVimOption] = useState<any>()
  const [vim, setVim] = useState<boolean>(false)
  const [fontSize, setFontSize] = useState<number>(13)

  const onMount: OnMount = (editor) => {
    editorRef.current = editor
    editor.focus()

    if (vim) {
      const statusNode = document.getElementById("status")
      const vimMode = initVimMode(editor, statusNode)
      setVimOption(vimMode)
    }
  }

  const onChange = useCallback(
    () => (value: string | undefined) => {
      setValue(value ?? "")
    },
    [setValue]
  )

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
        .then((_) => monaco.editor.setTheme("dracula"))

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
    <div className="w-full h-full">
      <div className="flex justify-between items-center w-full bg-accent  px-2 py-1 h-11">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 rounded-md p-1">
            <EditorToolbarButton
              Icon={Save}
              tooltip="Save"
              onClick={() => console.log("Save")}
            />
            <EditorToolbarButton
              Icon={Download}
              tooltip="Download"
              onClick={() => console.log("Download")}
            />
            <EditorToolbarButton
              Icon={Archive}
              tooltip="Archive"
              onClick={() => console.log("Archive")}
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-1 rounded-md p-1">
            <EditorToolbarButton
              Icon={Undo}
              tooltip="Undo"
              onClick={() => console.log("Undo")}
            />
            <EditorToolbarButton
              Icon={Redo}
              tooltip="Redo"
              onClick={() => console.log("Redo")}
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-1 rounded-md p-1">
            <EditorToolbarButton
              Icon={AArrowUp}
              tooltip="Increase font size"
              onClick={() => setFontSize(fontSize + 1)}
            />
            <EditorToolbarButton
              Icon={AArrowDown}
              tooltip="Decrease font size"
              onClick={() => setFontSize(fontSize - 1)}
            />
            <EditorToolbarButton
              Icon={ALargeSmall}
              tooltip="Reset font size"
              onClick={() => setFontSize(13)}
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center space-x-1 rounded-md p-1">
            <EditorToolbarButton
              Icon={VimIcon}
              tooltip="Vim Mode"
              onClick={() => setVim(!vim)}
              isActive={vim}
            />
            <EditorToolbarButton
              Icon={EyeIcon}
              tooltip="Preview"
              onClick={() => console.log("Preview")}
            />
            <EditorToolbarButton
              Icon={Settings}
              tooltip="Settings"
              onClick={() => console.log("Settings")}
            />
          </div>
        </div>
        <code id="status" className="text-sm rounded-md font-sans"></code>
      </div>
      <MonacoEditor
        height="100%"
        theme="dracula"
        defaultLanguage="markdown"
        defaultValue="// some comment"
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
          automaticLayout: true,
          autoIndent: "full",
          wordWrap: "on",
          fontSize: fontSize,
        }}
      />
    </div>
  )
}

interface EditorToolbarButtonProps {
  Icon: LucideIcon | ((props: SVGProps<SVGSVGElement>) => JSX.Element)
  onClick: () => void
  tooltip?: string
  isActive?: boolean
  disabled?: boolean
  className?: string
}

const EditorToolbarButton: FC<EditorToolbarButtonProps> = ({
  Icon,
  onClick,
  tooltip,
  isActive = false,
  disabled = false,
  className = "",
}) => {
  return (
    <>
      {tooltip ? (
        <TooltipWrapper
          content={tooltip}
          side="top"
          classes={{
            text: "text-xs",
            content: "bg-accent border-primary/20",
          }}
        >
          <Button
            variant="ghost"
            size="iconXs"
            onClick={onClick}
            disabled={disabled}
            className={cn(
              "bg-accent hover:bg-primary/20 text-muted-foreground hover:text-foreground",
              isActive && "bg-primary/20 hover:bg-primary/40 text-foreground",
              className
            )}
          >
            <Icon className="size-5" />
          </Button>
        </TooltipWrapper>
      ) : (
        <Button
          variant="ghost"
          size="iconXs"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "bg-accent hover:bg-primary/20 text-muted-foreground",
            isActive && "bg-primary/20 hover:bg-primary/40 text-foreground",
            className
          )}
        >
          <Icon className="size-5" />
        </Button>
      )}
    </>
  )
}

export default Editor
