import { redirect } from "next/navigation"

import { getSession } from "@/lib/auth/actions/session"

export const Authentication = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const user = await getSession()

  if (!user) {
    redirect("/")
  }

  return <>{children}</>
}
