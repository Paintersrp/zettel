import { useEffect, useState } from "react"

import KeyIcon from "@/components/icons/Key"
import LoginForm from "@/routes/login/LoginForm"

const AuthModal: React.FC = () => {
  const [fullscreenModal, setFullscreenModal] = useState(false)

  useEffect(() => {
    if (fullscreenModal) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [fullscreenModal])

  const handleCloseModal = () => {
    setFullscreenModal(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div>
      <button
        onClick={() => setFullscreenModal(true)}
        className="btn-secondary text-primary border-none px-2 py-2 ml-2"
      >
        <span className="size-6">
          <KeyIcon />
        </span>
      </button>
      {fullscreenModal && (
        <div
          className="fixed inset-0 z-[99] w-screen h-screen dark bg-page flex"
          onClick={handleCloseModal}
        >
          <div className="relative flex-shrink-0 hidden w-1/3 overflow-hidden bg-cover lg:block">
            <div className="absolute inset-0 z-20 w-full h-full opacity-70 bg-gradient-to-t from-black" />
            <img
              src="https://images.unsplash.com/photo-1612585763928-e64fdc2a3d38?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="z-10 object-cover w-full h-full"
              alt="Background"
            />
          </div>
          <div className="absolute top-0 right-0 z-30 container flex items-center justify-end h-18 mt-4">
            <button
              onClick={handleCloseModal}
              className="btn-secondary uppercase text-xs space-x-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span>Close</span>
            </button>
          </div>
          <div className="min-h-full w-full">
            <div className="relative flex flex-col justify-center items-center w-full h-full px-8">
              <LoginForm />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthModal
