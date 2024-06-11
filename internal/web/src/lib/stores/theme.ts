import { create } from "zustand"
import { persist } from "zustand/middleware"

import { IDBStorage } from "@/lib/idb"

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
      // Persist in local storage, and utilize first if it exists otherwise use assigned defaults
      name: "input-storage",
      getStorage: () => IDBStorage,
    }
  )
)

export { useTheme }
