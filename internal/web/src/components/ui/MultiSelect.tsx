"use client"

import {
  useCallback,
  useRef,
  useState,
  type Dispatch,
  type FC,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type SetStateAction,
} from "react"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/Badge"
import { Command, CommandGroup, CommandItem } from "@/components/ui/Command"
import { ScrollArea } from "@/components/ui/ScrollArea"

export interface MultiSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  options: { id: string; name: string }[]
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  selectedItems: { id: string; name: string }[]
  setSelectedItems: Dispatch<SetStateAction<{ id: string; name: string }[]>>
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  selected,
  setSelected,
  selectedItems,
  setSelectedItems,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const handleUnselect = useCallback(
    (role: string) => {
      setSelected((prev) => prev.filter((s) => s !== role))
    },
    [setSelected]
  )

  const handleUnselectName = useCallback(
    (role: { id: string; name: string }) => {
      setSelectedItems((prev) => prev.filter((s) => s !== role))
    },
    [setSelectedItems]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }

        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [setSelected]
  )

  const selectables = options.filter((option) => !selected.includes(option.id))

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedItems.map((role) => {
            return (
              <Badge key={`badge-${role.name}`} variant="secondary">
                {role.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(role.id)
                      handleUnselectName(role)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => {
                    handleUnselect(role.id)
                    handleUnselectName(role)
                  }}
                >
                  <X className="size-3 text-muted hover:text-default" />
                </button>
              </Badge>
            )
          })}

          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select roles..."
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <ScrollArea className="max-h-72 rounded-md border">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((role) => {
                  return (
                    <CommandItem
                      key={role.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue("")
                        setSelected((prev) => [...prev, role.id])
                        setSelectedItems((prev) => [...prev, role])
                      }}
                      className={"cursor-pointer"}
                    >
                      {role.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </ScrollArea>
          </div>
        ) : null}
      </div>
    </Command>
  )
}

export { MultiSelect }
