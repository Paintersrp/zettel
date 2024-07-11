import { memo, type FC } from "react"
import { InfoIcon, LinkIcon, TagsIcon } from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { formatDate } from "@/utils/date"
import { Separator } from "@/components/ui/Separator"

interface NoteInformationProps {
  note: NoteWithDetails
}

const NoteInformation: FC<NoteInformationProps> = memo(({ note }) => {
  const contentWordCount = note.content.split(" ").length
  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`
  const formattedCreationDate = formatDate(note.created_at)
  const formattedUpdatedDate = formatDate(note.updated_at)

  return (
    <div className="p-0 w-full flex flex-col">
      <div className="mb-6 space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <InfoIcon className="text-blue-500 size-5 mr-2" />
          Note Information
        </h3>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Created:</p>
            <p className="text-sm font-medium">{formattedCreationDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Updated:</p>
            <p className="text-sm font-medium">{formattedUpdatedDate}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Word Count:</p>
            <p className="text-sm font-medium">{wordCount}</p>
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
                className="rounded inline-block bg-primary/20 text-button text-xs font-medium px-2.5 py-0.5"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Note has no tags
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center">
          <LinkIcon className="text-emerald-500 size-5 mr-1" />
          Linked Notes
        </h3>
        <Separator />
        <div className="flex flex-wrap gap-2">
          {note.linked_notes?.length > 0 ? (
            note.linked_notes?.map((link) => (
              <span
                key={link.id}
                className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
              >
                {link.title}
              </span>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Note has no links
            </span>
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
})

export { NoteInformation }
