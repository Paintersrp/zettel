import { Suspense } from "react"

import { getSession } from "@/lib/session"

import { getVaults } from "../../lib/getVaults"
import { AppDashboard } from "./components/AppDashboard"
import { NoteStreak } from "./components/NoteStreak"
import { QuickLinks } from "./components/QuickLinks"
import { RecentActivity } from "./components/RecentActivity"
import { TagInsights } from "./components/TagInsights"
import { UpcomingTasks } from "./components/UpcomingTasks"
import { VaultStats } from "./components/VaultStats"
import { WordCountGoal } from "./components/WordCountGoal"

const App = async () => {
  const vaults = await getVaults()
  const user = await getSession()

  const activeVault =
    vaults.find((vault) => vault.id === user?.active_vault) || null

  return (
    <div className="flex relative bg-accent min-h-full h-full">
      <AppDashboard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 px-4 w-full">
          <div className="md:col-span-2 space-y-2">
            <Suspense>
              <VaultStats vault={activeVault} />
            </Suspense>
            <Suspense>
              <RecentActivity />
            </Suspense>
            <Suspense>
              <TagInsights />
            </Suspense>
          </div>
          <div className="space-y-2">
            <QuickLinks />

            <Suspense>
              <NoteStreak />
            </Suspense>

            <Suspense>
              <WordCountGoal />
            </Suspense>

            <UpcomingTasks />
          </div>
        </div>
      </AppDashboard>
    </div>
  )
}

export default App
