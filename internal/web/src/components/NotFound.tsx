import React from "react"
import { Link } from "@tanstack/react-router"

import { buttonVariants } from "./ui/Button"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className={buttonVariants({ variant: "primary", size: "sm" })}
      >
        Back
      </Link>
    </div>
  )
}

export default NotFound
