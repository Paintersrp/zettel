import { NoteStreak } from "./components/NoteStreak"
import { QuickLinks } from "./components/QuickLinks"
import { RecentActivitySkeleton } from "./components/RecentActivitySkeleton"
import { TagInsightsSkeleton } from "./components/TagInsightsSkeleton"
import { UpcomingTasks } from "./components/UpcomingTasks"
import { VaultStatsSkeleton } from "./components/VaultStatsSkeleton"
import { WordCountGoal } from "./components/WordCountGoal"

const AppLoading = () => {
  return (
    <div className="flex relative bg-accent min-h-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 px-4 w-full">
        <div className="md:col-span-2 space-y-2">
          <VaultStatsSkeleton />
          <RecentActivitySkeleton />
          <TagInsightsSkeleton />
        </div>
        <div className="space-y-2">
          <QuickLinks />
          <NoteStreak />
          <WordCountGoal />
          <UpcomingTasks />
        </div>
      </div>
    </div>
  )
}

export default AppLoading
