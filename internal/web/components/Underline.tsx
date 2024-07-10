import { FC, ReactNode } from "react"

interface UnderlineProps {
  children: ReactNode
}

export const Underline: FC<UnderlineProps> = ({ children }) => {
  return (
    <div className="relative group">
      {children}
      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full ease-out duration-300 h-0.5 bg-primary"></span>
    </div>
  )
}

export default Underline
