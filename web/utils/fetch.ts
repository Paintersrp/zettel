import "server-only"

import { cookies } from "next/headers"

const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const requestCookies = cookies()
  const jwtToken = requestCookies.get("jwt")

  const response = await fetch(`http://localhost:6474${url}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${jwtToken?.value}`,
    },
  })

  console.log(response)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export { fetchWrapper as fetch }
