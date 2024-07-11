import { memo, type FC } from "react"
import {
  ArrowUpCircleIcon,
  CalendarIcon,
  InfoIcon,
  LinkIcon,
  TagsIcon,
} from "lucide-react"

import { NoteWithDetails } from "@/types/app"
import { formatDate } from "@/utils/date"
import { Badge } from "@/components/ui/badge/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { ScrollArea } from "@/components/ui/ScrollArea"

interface NoteInformationProps {
  note: NoteWithDetails
}

const NoteInformation: FC<NoteInformationProps> = memo(({ note }) => {
  const contentWordCount = note.content.split(" ").length
  const wordCount = `${contentWordCount} Word${contentWordCount > 1 ? "s" : ""}`
  const formattedCreationDate = formatDate(note.created_at)
  const formattedUpdatedDate = formatDate(note.updated_at)

  return (
    <Card className="overflow-hidden rounded-none border-none h-full">
      <CardHeader className="bg-primary/10 pb-4 !pt-2">
        <CardTitle className="flex items-center gap-2 text-xl">
          <InfoIcon className="text-primary" />
          {note.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-12rem)] px-4 py-2">
          <Section
            icon={<CalendarIcon className="text-blue-500" />}
            title="Note Details"
          >
            <DetailItem label="Created" value={formattedCreationDate} />
            <DetailItem label="Updated" value={formattedUpdatedDate} />
            <DetailItem label="Word Count" value={wordCount} />
          </Section>

          <Section icon={<TagsIcon className="text-green-500" />} title="Tags">
            {note.tags && note.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Note has no tags
              </span>
            )}
          </Section>

          <Section
            icon={<LinkIcon className="text-purple-500" />}
            title="Linked Notes"
          >
            {note.linked_notes && note.linked_notes.length > 0 ? (
              <div className="flex flex-col gap-2">
                {note.linked_notes.map((link) => (
                  <Badge
                    key={link.id}
                    variant="outline"
                    className="justify-start"
                  >
                    {link.title}
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Note has no links
              </span>
            )}
          </Section>

          {note.upstream && (
            <Section
              icon={<ArrowUpCircleIcon className="text-indigo-500" />}
              title="Upstream Note"
            >
              <Badge
                variant="outline"
                className="bg-indigo-100 text-indigo-800"
              >
                {note.upstream}
              </Badge>
            </Section>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
})

const Section: FC<{
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}> = ({ icon, title, children }) => (
  <div className="mb-6 space-y-3">
    <h3 className="text-lg font-semibold flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <div className="bg-accent/50 rounded-lg p-3">{children}</div>
  </div>
)

const DetailItem: FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-sm text-muted-foreground">{label}:</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
)

export { NoteInformation }
