import type { ElementType, FC, ReactNode } from "react"

interface VerificationStatusProps {
  icon: ElementType
  title: string
  message: string
  iconClass?: string
  children?: ReactNode
}

export const VerificationStatus: FC<VerificationStatusProps> = ({
  icon: Icon,
  title,
  message,
  iconClass = "text-success",
  children,
}) => (
  <div className="flex flex-col items-center justify-center w-full gap-2 text-center">
    <Icon className={`size-12 ${iconClass}`} />
    <h1 className="text-2xl font-bold">{title}</h1>
    <p>{message}</p>
    {children}
  </div>
)
