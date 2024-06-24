import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const formatVaultName = (name: string) => {
  const words = name.split(" ")
  const formattedWords = words.map((word) => capFirst(word))
  return formattedWords.join(" ")
}
