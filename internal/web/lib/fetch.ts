import Cookies from "js-cookie"

const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const jwtToken = Cookies.get("jwt")

  const response = await fetch(`http://localhost:6474${url}`, {
    ...options,
    headers: {
      // "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${jwtToken}`,
    },
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response
}

export { fetchWrapper as fetch }
