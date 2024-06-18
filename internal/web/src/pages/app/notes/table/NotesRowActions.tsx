import { Row } from "@tanstack/react-table"

import { NoteWithDetails } from "@/types/app"

import { NotesTableMenu } from "./NotesTableMenu"

interface NotesRowActionsProps {
  row: Row<NoteWithDetails>
}

export function NotesRowActions({ row }: NotesRowActionsProps) {
  const note = row.original

  return <NotesTableMenu note={note} />
}
