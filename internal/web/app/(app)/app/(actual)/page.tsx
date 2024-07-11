import { Suspense } from "react"

import { getSession } from "@/lib/auth/actions/session"
import { getNotes } from "@/lib/note/queries/getNotes"

import { AppDashboard } from "./components/AppDashboard"
import { NoteStreak } from "./components/NoteStreak"
import { NoteStreakSkeleton } from "./components/NoteStreakSkeleton"
import { QuickLinks } from "./components/QuickLinks"
import { RecentActivity } from "./components/RecentActivity"
import RecentActivitySkeleton from "./components/RecentActivitySkeleton"
import { TagInsights } from "./components/tagInsights/TagInsights"
import TagInsightsSkeleton from "./components/tagInsights/TagInsightsSkeleton"
import { UpcomingTasks } from "./components/UpcomingTasks"
import { VaultStats } from "./components/vaultStats/VaultStats"
import { VaultStatsSkeleton } from "./components/vaultStats/VaultStatsSkeleton"
import { WordCountGoal } from "./components/WordCountGoal"
import WordCountGoalSkeleton from "./components/WordCountGoalSkeleton"

const App = async () => {
  const user = await getSession()
  const notes = getNotes(user?.active_vault ?? 0, 0, 0, "all")

  return (
    <div className="flex relative bg-accent min-h-full h-full">
      <AppDashboard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 px-4 w-full">
          <div className="md:col-span-2 space-y-2">
            <Suspense fallback={<VaultStatsSkeleton />}>
              <VaultStats data={notes} />
            </Suspense>

            <Suspense fallback={<RecentActivitySkeleton />}>
              <RecentActivity data={notes} />
            </Suspense>

            <Suspense fallback={<TagInsightsSkeleton />}>
              <TagInsights data={notes} />
            </Suspense>
          </div>
          <div className="space-y-2">
            <QuickLinks />
            <Suspense fallback={<NoteStreakSkeleton />}>
              <NoteStreak data={notes} />
            </Suspense>

            <Suspense fallback={<WordCountGoalSkeleton />}>
              <WordCountGoal data={notes} />
            </Suspense>

            <UpcomingTasks />
          </div>
        </div>
      </AppDashboard>
    </div>
  )
}

export default App
