import type { FC } from "react"
import { Link } from "@tanstack/react-router"
import { BookOpen, EditIcon, X } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"

import { Skeleton } from "@/components/ui/Skeleton"
import { TooltipWrapper } from "@/components/ui/Tooltip"
import { buttonVariants } from "@/components/ui/variants/button"

interface NoteLinkButtonsProps {
  note: NoteWithDetails
  onDeselect?: () => void
}

const linkClass = buttonVariants({
  variant: "outline",
  size: "iconSm",
  className: "px-1.5 py-1.5 h-7 border-none text-primary hover:text-primary/90",
})

export const NoteLinkButtons: FC<NoteLinkButtonsProps> = ({
  note,
  onDeselect,
}) => {
  return (
    <div className="space-x-1">
      <TooltipWrapper content="Edit Note" side="top">
        <Link
          to="/app/notes/$id/edit"
          params={{ id: note.id.toString() }}
          state={{ note: note }}
          className={linkClass}
        >
          <EditIcon className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
      <TooltipWrapper content="Read Note" side="top">
        <Link
          to="/app/notes/$id"
          params={{ id: note.id.toString() }}
          state={{ note: note }}
          className={linkClass}
        >
          <BookOpen className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
      {onDeselect && (
        <TooltipWrapper content="Clear Selection" side="top">
          <button onClick={onDeselect} className={linkClass}>
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
