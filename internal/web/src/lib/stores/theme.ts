import { create } from "zustand"
import { persist } from "zustand/middleware"

type Theme = "light" | "dark"

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const useTheme = create(
  persist<ThemeStore>(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        set({ theme })
      },
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        }))
      },
    }),
    {
      name: "theme",
    }
  )
)

export { useTheme }
