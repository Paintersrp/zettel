import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatVaultName = (name: string) => {
  const words = name.split(" ")
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  )
  return formattedWords.join(" ")
}
