import Link from "next/link"

interface WebDrawerItemProps {
  text: string
  to: string
  icon: React.ReactNode
}

export const WebDrawerItem: React.FC<WebDrawerItemProps> = ({
  text,
  to,
  icon,
}) => {
  return (
    <li>
      {to.startsWith("http") ? (
        <a
          href={to}
          className="flex gap-4 items-center justify-between px-4 py-2 text-muted-foreground rounded hover:bg-card"
        >
          {text}
          {icon}
        </a>
      ) : (
        <Link
          href={to}
          className="flex gap-4 items-center justify-between px-4 py-2 text-muted-foreground rounded hover:bg-card"
        >
          {text}
          {icon}
        </Link>
      )}
    </li>
  )
}
