export const PreviewPanel = ({
  noteId,
  fullScreen,
}: {
  noteId: string | null
  fullScreen?: boolean
}) => {
  return (
    <div>
      Preview of Note {noteId} (Full Screen: {fullScreen ? "Yes" : "No"})
    </div>
  )
}

export default PreviewPanel
