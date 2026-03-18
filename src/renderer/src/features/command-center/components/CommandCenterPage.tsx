import { CommandCenterHeader } from './CommandCenterHeader'
import { NeedsActionSection } from './NeedsActionSection'
import { InProgressSection } from './InProgressSection'
import { RecentActivitySection } from './RecentActivitySection'

export function CommandCenterPage() {
  return (
    <div className="flex h-full flex-col">
      <CommandCenterHeader />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="space-y-8">
          <NeedsActionSection />
          <InProgressSection />
          <RecentActivitySection />
        </div>
      </div>
    </div>
  )
}
