import { cookies } from "next/headers"

export const getToken = (): string | null => {
  const requestCookies = cookies()
  const token = requestCookies.get("jwt")

  if (!token) {
    return null
  }

  return token.value
}
