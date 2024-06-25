import { useEffect } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { useMounted } from "@/hooks/useMounted"
import { useTheme } from "@/lib/stores/theme"
import { cn } from "@/lib/utils"

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
    <button
      className={cn(
        "btn-secondary px-2 py-2 text-primary border-none flex size-9 shrink-0 items-center justify-center gap-2 font-semibold hover:bg-page",
        classes?.button
      )}
      onClick={toggleTheme}
    >
      <span className="sr-only">Toggle mode</span>

      {theme !== "dark" ? (
        <SunIcon className={cn("sun-icon", iconClass)} />
      ) : (
        <MoonIcon className={cn("moon-icon", iconClass)} />
      )}
    </button>
  )
}
