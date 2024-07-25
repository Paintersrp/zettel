"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { useMounted } from "@/hooks/useMounted"
import { cn } from "@/utils/cn"

import { Button } from "./ui/button/Button"

export const ThemeToggle = ({
  classes,
}: {
  classes?: { button?: string; icon?: string }
}) => {
  const { theme, setTheme } = useTheme()

  const mounted = useMounted()

  const iconClass = classes?.icon ?? "size-6"

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="iconSm"
        className={cn("group", classes?.button)}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <span className="sr-only">Toggle mode</span>

        <MoonIcon className={cn("moon-icon", iconClass)} />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="iconSm"
      className={cn("group", classes?.button)}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
