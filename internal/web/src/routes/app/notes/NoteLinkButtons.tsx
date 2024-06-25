import { FC } from "react"
import { Link } from "@tanstack/react-router"
import { BookOpen, EditIcon, X } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Skeleton } from "@/components/ui/Skeleton"
import { TooltipWrapper } from "@/components/ui/Tooltip"

interface NoteLinkButtonsProps {
  note: NoteWithDetails
  onDeselect?: () => void
}

const NoteLinkButtons: FC<NoteLinkButtonsProps> = ({ note, onDeselect }) => {
  return (
    <div className="space-x-1">
      <TooltipWrapper content="Edit Note" side="top">
        <Link
          to="/notes/$id/edit"
          params={{ id: note.id.toString() }}
          state={{ note: note }}
          className="btn-secondary border-none text-primary hover:bg-success bg-contrast px-1.5 py-1.5 h-7"
        >
          <EditIcon className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
      <TooltipWrapper content="Read Note" side="top">
        <Link
          to="/notes/$id"
          params={{ id: note.id.toString() }}
          state={{ note: note }}
          className="btn-secondary border-none text-primary hover:bg-success bg-contrast px-1.5 py-1.5 h-7"
        >
          <BookOpen className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
      {onDeselect && (
        <TooltipWrapper content="Clear Selection" side="top">
          <button
            onClick={onDeselect}
            className="btn-secondary border-none text-primary hover:bg-error bg-contrast px-1.5 py-1.5 h-7"
          >
            <X className="size-4" />
            <span className="sr-only">Toggle Settings Menu</span>
          </button>
        </TooltipWrapper>
      )}
    </div>
  )
}

export const NoteLinkButtonsSkeleton = () => {
  return (
    <div className="space-x-2 flex">
      <Skeleton className="p-1.5 size-7 " />
      <Skeleton className="p-1.5 size-7" />
      <Skeleton className="p-1.5 size-7" />
    </div>
  )
}

export default NoteLinkButtons
