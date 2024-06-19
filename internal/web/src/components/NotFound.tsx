import React from "react"
import { Link } from "@tanstack/react-router"

import { Button, buttonVariants } from "@/components/ui/Button"

const NotFound: React.FC<{ children?: any }> = ({ children }) => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist.
      </p>
      {children || (
        <p className="flex items-center gap-2 flex-wrap">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => window.history.back()}
            className="uppercase font-bold text-sm"
          >
            Go back
          </Button>
          <Link
            className={buttonVariants({
              size: "xs",
              className: "uppercase font-bold text-sm",
            })}
            to="/"
          >
            Start Over
          </Link>
        </p>
      )}
    </div>
  )
}

export default NotFound
