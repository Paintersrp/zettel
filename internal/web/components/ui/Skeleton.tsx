import type { FC, HTMLAttributes } from "react"

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`animate-pulse duration-3000 rounded ${className}`}
      {...props}
    />
  )
}

export { Skeleton }
