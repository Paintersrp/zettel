import {
  ErrorComponent,
  ErrorComponentProps,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router"

import { Button } from "@/components/ui/Button"
import { buttonVariants } from "@/components/ui/variants/button"

export function CatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  })

  console.error(error)

  return (
    <div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <div className="w-full">
        <ErrorComponent error={error} />
      </div>
      <div className="flex gap-2 items-center flex-wrap">
        <Button
          variant="ghost"
          size="xs"
          onClick={() => {
            router.invalidate()
          }}
          className="uppercase font-bold text-sm"
        >
          Try Again
        </Button>
        {isRoot ? (
          <Link
            to="/"
            className={buttonVariants({
              size: "xs",
              className: "uppercase font-bold text-sm",
            })}
          >
            Zethub Home
          </Link>
        ) : (
          <Link
            to="/"
            className={buttonVariants({
              size: "xs",
              className: "uppercase font-bold text-sm",
            })}
            onClick={(e) => {
              e.preventDefault()
              window.history.back()
            }}
          >
            Go Back
          </Link>
        )}
      </div>
    </div>
  )
}
