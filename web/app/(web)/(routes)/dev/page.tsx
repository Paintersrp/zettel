import React from "react"

import { getSession } from "@/lib/auth/actions/session"
import { DevCode } from "@/components/ui/DevCode"

const DevPage = async () => {
  const user = await getSession()

  return (
    <div className="w-full">
      <DevCode data={user} />
    </div>
  )
}

export default DevPage
