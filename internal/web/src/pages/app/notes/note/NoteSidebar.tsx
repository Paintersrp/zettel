import { format } from "date-fns"

import { NoteWithDetails } from "@/types/app"
import { InfoIcon, LinkIcon, TagsIcon } from "@/components/icons"

interface NoteSidebarProps {
  note: NoteWithDetails
}

const NoteSidebar: React.FC<NoteSidebarProps> = ({ note }) => (
  <div className="flex flex-col gap-4">
    <div>
      <h3 className="font-semibold text-lg flex items-center mb-2 pb-1 border-b">
        <span className="size-6 mr-1 text-primary">
          <TagsIcon />
        </span>
        Tags
      </h3>
      <div className="flex gap-1 flex-wrap">
        {note.tags?.length > 0 ? (
          note.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-block bg-primary text-xs font-semibold px-2 py-1 rounded"
            >
              {tag.name}
            </span>
          ))
        ) : (
          <span className="inline-block text-[0.8rem] font-semibold">
            Note has no tags
          </span>
        )}
      </div>
    </div>
    <div>
      <h3 className="font-semibold text-lg flex items-center mb-2 pb-1 border-b">
        <span className="size-6 mr-1 text-secondary">
          <LinkIcon />
        </span>
        Linked Notes
      </h3>
      <div className="flex gap-1 flex-wrap">
        {note.linkedNotes?.length > 0 ? (
          note.linkedNotes?.map((link) => (
            <span
              key={link.id}
              className="inline-block bg-secondary text-xs font-semibold px-2 py-1 rounded"
            >
              {link.title}
            </span>
          ))
        ) : (
          <span className="inline-block text-[0.8rem] font-semibold">
            Note has no links
          </span>
        )}
      </div>
    </div>
    <div className="mb-4">
      <h3 className="font-semibold text-lg flex items-center mb-2 pb-1 border-b">
        <span className="size-6 mr-1 text-info">
          <InfoIcon />
        </span>
        Note Information
      </h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="font-semibold mr-2">Created At:</span>
          <span className="text-[0.8rem]">
            {format(new Date(note.created_at), "MMM d, yyyy")}
          </span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Updated At:</span>
          <span className="text-[0.8rem]">
            {format(new Date(note.updated_at), "MMM d, yyyy")}
          </span>
        </div>
      </div>
    </div>
  </div>
)

export { NoteSidebar }
