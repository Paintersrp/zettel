import { QuickLinks } from "@/features/app/app/components/QuickLinks"
import { QuickStats } from "@/features/app/app/components/QuickStats"
import { RecentActivity } from "@/features/app/app/components/RecentActivity"
import { TagInsights } from "@/features/app/app/components/TagInsights"
import { UpcomingTasks } from "@/features/app/app/components/UpcomingTasks"
import { VaultInfo } from "@/features/app/app/components/VaultInfo"
import { useAuth } from "@/features/auth/providers"

const App = () => {
  const { user } = useAuth()

  if (!user || !user.active_vault) {
    return null
  }

  return (
    <div className="p-2 max-w-7xl mx-auto min-h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="md:col-span-2 space-y-2">
          <QuickStats />
          <RecentActivity />
          <TagInsights />
        </div>

        <div className="space-y-2">
          <QuickLinks />
          <VaultInfo />
          <UpcomingTasks />
        </div>
      </div>
    </div>
  )
}

export default App
