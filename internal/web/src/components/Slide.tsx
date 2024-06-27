import { type FC, type ReactNode } from "react"

import useIntersection from "@/hooks/useIntersection"
import { cn } from "@/lib/utils"

interface SlideUpProps {
  children: ReactNode
  className?: string
}

export const SlideUp: FC<SlideUpProps> = ({ children, className }) => {
  const { ref } = useIntersection({
    threshold: 0.2,
    onIntersect: (entry) => handleIntersection(entry),
  })

  const handleIntersection = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0")
      entry.target.classList.remove("translate-y-8")
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "sine-free duration-700 opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  )
}
