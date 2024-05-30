import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: "http://localhost:6474",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = Cookies.get("jwt")
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`
    }
    return config
  },
  (error) => {
    if (error.response.status === 401) {
      console.log("Unauthorized access, redirecting to login page")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
