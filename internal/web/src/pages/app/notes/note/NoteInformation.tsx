import { format } from "date-fns"
import { InfoIcon, LinkIcon, TagsIcon } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { Separator } from "@/components/ui/Separator"

interface NoteInformationProps {
  note: NoteWithDetails
}

const NoteInformation: React.FC<NoteInformationProps> = ({ note }) => {
  const contentWordCount = note.content.split(" ").length

  return (
    <div className="shadow-md p-0 w-full flex flex-col">
      <div className="mb-6 space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <InfoIcon className="text-info size-5 mr-2" />
          Note Information
        </h3>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted">Created:</p>
            <p className="text-sm font-medium">
              {format(new Date(note.created_at), "MMM d, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Updated:</p>
            <p className="text-sm font-medium">
              {format(new Date(note.updated_at), "MMM d, yyyy")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted">Word Count:</p>
            <p className="text-sm font-medium">{contentWordCount}</p>
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <TagsIcon className="text-primary size-5 mr-1" />
          Tags
        </h3>
        <Separator />
        <div className="flex flex-wrap gap-2">
          {note.tags?.length > 0 ? (
            note.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded inline-block bg-contrast text-button text-xs font-medium px-2.5 py-0.5"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted">Note has no tags</span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <LinkIcon className="text-secondary size-5 mr-1" />
          Linked Notes
        </h3>
        <Separator />
        <div className="flex flex-wrap gap-2">
          {note.linkedNotes?.length > 0 ? (
            note.linkedNotes?.map((link) => (
              <span
                key={link.id}
                className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {link.title}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted">Note has no links</span>
          )}
        </div>
      </div>

      {note.upstream && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold flex items-center">
            <LinkIcon className="text-purple-500 size-5 mr-1" />
            Upstream Note
          </h3>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {note.upstream}
          </span>
        </div>
      )}
    </div>
  )
}

export { NoteInformation }