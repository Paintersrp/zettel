import { useScrollAreaScrollToTop } from "@/hooks/useScrollAreaScrollToTop"
import { loadingLazy, nullLazy } from "@/lib/lazy"

import { ScrollArea } from "@/components/ui/ScrollArea"
import { AppLoadingCard } from "@/features/app/app/components/AppLoadingCard"
import { NoteStreak } from "@/features/app/app/components/NoteStreak"
import { QuickLinks } from "@/features/app/app/components/QuickLinks"
import { RecentActivity } from "@/features/app/app/components/RecentActivity"
import { UpcomingTasks } from "@/features/app/app/components/UpcomingTasks"
import { VaultStats } from "@/features/app/app/components/VaultStats"
import { WordCountGoalSkeleton } from "@/features/app/app/components/WordCountGoalSkeleton"
import { useAuth } from "@/features/auth/providers"

const AppScrollToTop = nullLazy(() =>
  import("@/components/AppScrollToTop").then((module) => ({
    default: module.AppScrollToTop,
  }))
)

const TagInsights = loadingLazy(
  () =>
    import("@/features/app/app/components/TagInsights").then((module) => ({
      default: module.TagInsights,
    })),
  <AppLoadingCard
    title="Tag Insights"
    description="Analyze your tag usage"
    classes={{ content: "h-[300px]" }}
  />
)

const WordCountGoal = loadingLazy(
  () =>
    import("@/features/app/app/components/WordCountGoal").then((module) => ({
      default: module.WordCountGoal,
    })),
  <WordCountGoalSkeleton />
)

// 34.52kb 7/04/24
// 20.24kb 7/04/24 - Lazy loading TagInsights with Skeleton Display
// 15.45kb 7/04/24 - Lazy loading WordCountGoal with Skeleton Display

const App = () => {
  const { user } = useAuth()
  const { scrollAreaRef, isOverThreshold, scrollToTop } =
    useScrollAreaScrollToTop()

  if (!user || !user.active_vault) {
    return null
  }

  return (
    <div className="flex relative bg-accent">
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
      <AppScrollToTop visible={isOverThreshold} onClick={scrollToTop} />
    </div>
  )
}

export default App
