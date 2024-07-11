import React from "react"
import { format } from "date-fns"
import {
  ArrowUpCircle,
  Calendar,
  Clock,
  FileText,
  Link as LinkIcon,
  Tag as TagIcon,
} from "lucide-react"

import { LinkedNote, NoteWithDetails, Tag as TagType } from "@/types/app"
import { Badge } from "@/components/ui/badge/Badge"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { Separator } from "@/components/ui/Separator"

import SidePanelHeading from "../SidePanelHeading"

interface NoteInformationProps {
  note: NoteWithDetails
}

const InfoItem: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
}> = ({ icon, label, value }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center text-sm text-muted-foreground">
      {React.cloneElement(icon as React.ReactElement, {
        className: "size-4 mr-2",
      })}
      <span>{label}</span>
    </div>
    <span className="text-sm font-medium">{value}</span>
  </div>
)

export const NoteInformation: React.FC<NoteInformationProps> = ({ note }) => {
  const formatDate = (date: Date) => format(new Date(date), "MMM d, yyyy HH:mm")
  const wordCount = note.content.split(/\s+/).length

  return (
    <div className="bg-accent h-full flex flex-col">
      <SidePanelHeading
        title={note.title}
        description={
          <>
            <span>ID: {note.id}</span>
            <span>•</span>
            <span>Vault: {note.vault_id}</span>
          </>
        }
      />

      <ScrollArea className="flex-grow bg-card">
        <div className="p-4 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2 text-primary">
              {/* TODO: Icon */}
              Note Details
            </h3>
            <InfoItem
              icon={<Calendar />}
              label="Created"
              value={formatDate(note.created_at)}
            />
            <InfoItem
              icon={<Clock />}
              label="Updated"
              value={formatDate(note.updated_at)}
            />
            <InfoItem
              icon={<FileText />}
              label="Word Count"
              value={`${wordCount} words`}
            />
            {note.upstream && (
              <InfoItem
                icon={<ArrowUpCircle />}
                label="Upstream"
                value={String(note.upstream)}
              />
            )}
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center text-primary">
              <TagIcon className="mr-2 size-5" />
              Tags
            </h3>
            {note.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag: TagType) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-blue-500/10 text-foreground hover:bg-blue-500/10"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </section>

          <Separator />

          {/* TODO: Improve */}
          <section>
            <h3 className="text-lg font-semibold mb-2 flex items-center text-primary">
              <LinkIcon className="mr-2 size-5" />
              Linked Notes
            </h3>
            {note.linked_notes && note.linked_notes.length > 0 ? (
              <ul className="space-y-1">
                {note.linked_notes.map((link: LinkedNote) => (
                  <li key={link.id} className="flex items-center text-sm">
                    <span className="size-2 bg-blue-500/70 rounded-full mr-2"></span>
                    <span className="text-blue-500/70">{link.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No linked notes
              </p>
            )}
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
