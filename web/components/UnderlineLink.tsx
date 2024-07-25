import { FC, ReactNode } from "react"
import Link, { LinkProps } from "next/link"

interface UnderlineProps extends LinkProps {
  children: ReactNode
}

export const UnderlineLink: FC<UnderlineProps> = ({ children, ...props }) => {
  return (
    <div className={`relative group`}>
      <Link {...props}>{children}</Link>
      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary"></span>
    </div>
  )
}

export default UnderlineLink
