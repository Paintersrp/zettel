import { FC, memo } from "react"
import { useNavigate } from "@tanstack/react-router"
import {
  BookOpen,
  CalendarDays,
  Edit,
  LinkIcon,
  MoreHorizontal,
  Tag,
  Tally5,
} from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import type { NoteWithDetails } from "@/types/app"

import { Button } from "@/components/ui/Button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/ContextMenu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { useSidePanel } from "@/features/app/layout/sidepanel/state/sidePanel"

import NoteLinkButtons from "./NoteLinkButtons"

interface NoteListItemProps {
  note: NoteWithDetails
}

export const NoteListItem: FC<NoteListItemProps> = memo(({ note }) => {
  const sidePanel = useSidePanel()
  const navigate = useNavigate()

  const contentWordCount = note.content.split(" ").length
  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`
  const formattedDate = formatDate(note.created_at)

  // TODO: Handle as Link
  const handleRead = () => {
    navigate({
      to: "/app/notes/$id",
      params: { id: note.id.toString() },
      state: { note },
    })
  }

  // TODO: Handle as Link
  const handleEdit = () => {
    navigate({
      to: "/app/notes/$id/edit",
      params: { id: note.id.toString() },
      state: { note },
    })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "group relative py-2 px-3 w-full flex flex-col bg-card gap-1.5 border-b sine-free duration-100 cursor-pointer hover:bg-primary/5",
            !sidePanel.currentState.isOpen && "sm:px-4 sm:py-4"
          )}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <div className="flex items-center text-xs md:text-sm text-muted-foreground gap-4">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5 md:size-4 text-primary" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Tally5 className="size-3.5 md:size-4 text-primary" />
                  {wordCount}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-semibold sine-free duration-100">
                {note.title}
              </h2>
            </div>
            <div className="flex gap-1 sine-free duration-100 opacity-0 group-hover:opacity-100">
              <NoteLinkButtons note={note} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="iconXs">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleRead}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Read</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex gap-4 text-xs justify-between items-end md:font-medium">
            <div className="flex flex-col items-start gap-1 text-foreground">
              <div className="flex gap-3">
                <span className="flex gap-1 items-center px-2 py-1 bg-primary/10 rounded-full">
                  <Tag className="size-3.5 text-primary" />
                  {note.tags?.length ?? 0} Tags
                </span>
                <span className="flex gap-1 items-center px-2 py-1 bg-primary/10 rounded-full">
                  <LinkIcon className="size-3.5 text-primary" />
                  {note.linked_notes?.length ?? 0} Links
                </span>
              </div>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      {/* TODO: Add Linked Notes Links to ContextMenu */}
      {/* TODO: Add Tag Links to ContextMenu */}
      <ContextMenuContent>
        <ContextMenuItem onClick={handleRead}>
          <BookOpen className="mr-2 h-4 w-4" />
          <span>Read</span>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleEdit}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
})

export default NoteListItem
