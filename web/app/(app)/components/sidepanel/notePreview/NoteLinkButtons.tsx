import type { FC } from "react"
import Link from "next/link"
import { BookOpen, EditIcon } from "lucide-react"

import type { NoteWithDetails } from "@/types/app"
import { buttonVariants } from "@/components/ui/button/variants"
import { Skeleton } from "@/components/ui/Skeleton"
import { TooltipWrapper } from "@/components/ui/Tooltip"

import { NoteLinkInformationButton } from "./NoteLinkInformationButton"

interface NoteLinkButtonsProps {
  note: NoteWithDetails
}

const linkClass = buttonVariants({
  variant: "ghost",
  size: "iconXs",
  className: "!bg-accent hover:!bg-primary/20 text-primary",
})

const toolTipClasses = {
  text: "text-xs",
  content: "bg-accent border-primary/20 p-1.5",
}

export const NoteLinkButtons: FC<NoteLinkButtonsProps> = ({ note }) => {
  return (
    <div className="space-x-1 flex">
      <TooltipWrapper
        content="Note Information"
        side="top"
        classes={toolTipClasses}
      >
        <div>
          <NoteLinkInformationButton note={note} />
        </div>
      </TooltipWrapper>
      <TooltipWrapper content="Edit Note" side="top" classes={toolTipClasses}>
        <Link
          href={`/app/notes/${note.id}/edit`}
          // state={{ note: note }}
          className={linkClass}
        >
          <EditIcon className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
      <TooltipWrapper content="Read Note" side="top" classes={toolTipClasses}>
        <Link
          href={`/app/notes/${note.id}/edit`}
          // state={{ note: note }}
          className={linkClass}
        >
          <BookOpen className="size-4" />
          <span className="sr-only">Toggle Settings Menu</span>
        </Link>
      </TooltipWrapper>
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
