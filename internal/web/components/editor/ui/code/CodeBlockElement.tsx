"use client"

import { useCodeBlockElementState } from "@udecode/plate-code-block"
import { PlateElement } from "@udecode/plate-common"

import { CodeBlockCombobox } from "./CodeBlockCombobox"

import "./CodeBlockElement.css"

import { withRef } from "@/utils/withRef"
import { cn } from "@/utils/cn"

export const CodeBlockElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const { element } = props
    const state = useCodeBlockElementState({ element })

    return (
      <PlateElement
        className={cn("relative py-1", state.className, className)}
        ref={ref}
        {...props}
      >
        <pre className="overflow-x-auto rounded-md bg-muted px-6 py-8 font-mono text-sm leading-[normal] [tab-size:2]">
          <code>{children}</code>
        </pre>

        {state.syntax && (
          <div
            className="absolute right-2 top-2 z-10 select-none"
            contentEditable={false}
          >
            <CodeBlockCombobox />
          </div>
        )}
      </PlateElement>
    )
  }
)
