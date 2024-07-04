import { useEffect, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

import { User } from "@/types/app"

import { Loading } from "@/components/Loading"

import { splashRedirectRoute } from "."

// 0.62kb 7/04/24

const SplashRedirect = () => {
  const queryClient = useQueryClient()
  const navigate = splashRedirectRoute.useNavigate()
  const { redirect } = splashRedirectRoute.useSearch()
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const waitForUserDataThenRedirect = async () => {
      setIsProcessing(true)

      await queryClient.invalidateQueries({ queryKey: ["user"] })

      // Wait for the query to settle
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Check if the query is still fetching
      while (queryClient.getQueryState(["user"])?.status === "pending") {
        await new Promise((resolve) => setTimeout(resolve, 100))
      }

      // Fetch the updated user data
      const updatedUser: User | undefined = queryClient.getQueryData(["user"])

      if (redirect) {
        navigate({ to: redirect })
      } else if (updatedUser?.active_vault) {
        navigate({ to: "/app/notes", search: { filter: "all" } })
      } else if (updatedUser) {
        navigate({ to: "/app/vaults" })
      } else {
        navigate({ to: "/app" })
      }
    }

    if (!isProcessing) {
      waitForUserDataThenRedirect()
    }
  }, [queryClient, navigate, isProcessing])

  return <Loading iconClass="size-24" />
}

export default SplashRedirect
