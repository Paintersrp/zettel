import Cookies from "js-cookie"
import ky from "ky"

const api = ky.create({
  prefixUrl: "http://localhost:6474",
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const jwtToken = Cookies.get("jwt")
        if (jwtToken) {
          request.headers.set("Authorization", `Bearer ${jwtToken}`)
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (!response.ok && response.status === 401) {
          console.log("Unauthorized access, redirecting to login page")
          window.location.href = "/login"
        }
      },
    ],
  },
})

export default api
