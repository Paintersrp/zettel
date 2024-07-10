import { Suspense } from "react"

import { getVaults } from "../../lib/getVaults"
import { AppDashboard } from "./components/AppDashboard"
import { NoteStreak } from "./components/NoteStreak"
import { QuickLinks } from "./components/QuickLinks"
import { RecentActivity } from "./components/RecentActivity"
import { TagInsights } from "./components/TagInsights"
import { UpcomingTasks } from "./components/UpcomingTasks"
import { VaultStats } from "./components/VaultStats"
import { VaultStatsSkeleton } from "./components/VaultStatsSkeleton"
import { WordCountGoal } from "./components/WordCountGoal"

const App = async () => {
  const vaults = getVaults()

  return (
    <div className="flex relative bg-accent min-h-full h-full">
      <AppDashboard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 px-4 w-full">
          <div className="md:col-span-2 space-y-2">
            <Suspense fallback={<VaultStatsSkeleton />}>
              <VaultStats vaults={vaults} />
            </Suspense>

            <RecentActivity />
            <TagInsights />
          </div>
          <div className="space-y-2">
            <QuickLinks />
            <NoteStreak />
            <WordCountGoal />
            <UpcomingTasks />
          </div>
        </div>
      </AppDashboard>
    </div>
  )
}

export default App
