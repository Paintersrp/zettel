export const capFirst = (str: string) => {
  if (!str || typeof str !== "string") return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatVaultName = (name: string) => {
  const words = name.split(" ")
  const formattedWords = words.map((word) => capFirst(word))
  return formattedWords.join(" ")
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length)}...`
}
