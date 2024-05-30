import type { FC } from "react"

interface DevCodeProps {
  data: any
}

const DevCode: FC<DevCodeProps> = ({ data }) => {
  if (process.env.NODE_ENV === "production") return null

  return (
    <pre className="mt-2 w-full rounded-md p-4 border whitespace-pre-wrap">
      <code className="text-primary">{JSON.stringify(data, null, 2)}</code>
    </pre>
  )
}

export { DevCode }
