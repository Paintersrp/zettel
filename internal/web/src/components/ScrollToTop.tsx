import { FC, useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "./ui/Button"

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      id="back-to-top"
      size="iconXs"
      className={cn("fixed bottom-4 right-4 rounded", !isVisible && "hidden")}
      onClick={scrollToTop}
    >
      <ChevronUp className="size-5" />
    </Button>
  )
}

interface ScrollToTopAppProps {
  visible: boolean
  onClick: () => void
  classes?: { button?: string; icon?: string }
}

export const ScrollToTopApp: FC<ScrollToTopAppProps> = ({
  visible,
  onClick,
  classes,
}) => {
  if (!visible) {
    return null
  }
  return (
    <Button
      variant="primary"
      size="iconXs"
      className={cn(
        "absolute bottom-4 right-4 rounded-full shadow-lg",
        classes?.button
      )}
      onClick={onClick}
    >
      <ChevronUp className={cn("size-5", classes?.icon)} />
    </Button>
  )
}

export default ScrollToTop
