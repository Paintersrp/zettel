import { useEffect } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { useMounted } from "@/hooks/useMounted"
import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"

import { Button } from "./ui/Button"

export const ThemeToggle = ({
  classes,
}: {
  classes?: { button?: string; icon?: string }
}) => {
  const { theme, toggleTheme } = useTheme()

  const mounted = useMounted()

  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.remove("dark")
    } else {
      root.classList.add("dark")
    }
  }, [theme])

  if (!mounted) {
    return null
  }

  const iconClass = classes?.icon ?? "size-6"

  return (
    <Button
      variant="ghost"
      size="iconSm"
      className={cn("group", classes?.button)}
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle mode</span>

      {theme !== "dark" ? (
        <SunIcon className={cn("sun-icon", iconClass)} />
      ) : (
        <MoonIcon className={cn("moon-icon", iconClass)} />
      )}
    </Button>
  )
}
