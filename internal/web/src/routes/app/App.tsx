import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { ScrollToTopApp } from "@/components/ScrollToTop"
import { NoteStreak } from "@/features/app/app/components/NoteStreak"
import { QuickLinks } from "@/features/app/app/components/QuickLinks"
import { RecentActivity } from "@/features/app/app/components/RecentActivity"
import { TagInsights } from "@/features/app/app/components/TagInsights"
import { UpcomingTasks } from "@/features/app/app/components/UpcomingTasks"
import { VaultStats } from "@/features/app/app/components/VaultStats"
import { WordCountGoal } from "@/features/app/app/components/WordCountGoal"
import { useAuth } from "@/features/auth/providers"

const App = () => {
  const { user } = useAuth()
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()

  if (!user || !user.active_vault) {
    return null
  }

  return (
    <div className="flex relative">
      <ScrollArea
        viewportRef={scrollAreaRef}
        id="dashboard-view"
        className="flex flex-col gap-4 w-full justify-center items-center relative transition-opacity duration-200 h-[calc(100vh-3rem)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 py-2 px-4 w-full">
          <div className="md:col-span-2 space-y-2">
            <VaultStats />
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
      </ScrollArea>
      <ScrollToTopApp visible={isOverThreshold} onClick={scrollToTop} />
    </div>
  )
}

export default App
