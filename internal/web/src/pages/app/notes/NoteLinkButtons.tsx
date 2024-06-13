import React from "react"
import { Link } from "@tanstack/react-router"
import { BookOpen, EditIcon } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Skeleton } from "@/components/ui/Skeleton"

interface NoteLinkButtonsProps {
  note: NoteWithDetails
}

const NoteLinkButtons: React.FC<NoteLinkButtonsProps> = ({ note }) => {
  return (
    <div className="space-x-2">
      <Link
        to="/notes/$id/edit"
        params={{ id: note.id.toString() }}
        state={{ note: note }}
        className="btn-secondary border-none text-primary hover:bg-primary bg-contrast px-1.5 py-1.5 h-7"
      >
        <EditIcon className="size-4" />
        <span className="sr-only">Toggle Settings Menu</span>
      </Link>
      <Link
        to="/notes/$id"
        params={{ id: note.id.toString() }}
        state={{ note: note }}
        className="btn-secondary border-none text-primary hover:bg-primary bg-contrast px-1.5 py-1.5 h-7"
      >
        <BookOpen className="size-4" />
        <span className="sr-only">Toggle Settings Menu</span>
      </Link>
    </div>
  )
}

export const NoteLinkButtonsSkeleton = () => {
  return (
    <div className="space-x-2 flex">
      <Skeleton className="p-1.5 size-7 " />
      <Skeleton className="p-1.5 size-7" />
    </div>
  )
}

export default NoteLinkButtons
