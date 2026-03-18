import { Monitor, Search, Bell } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { getAblyStatus } from '@/shared/lib/ably-client'

export function CommandCenterHeader() {
  const ablyStatus = getAblyStatus()

  return (
    <div className="flex items-center justify-between border-b border-forge-border px-6 py-4">
      <div className="flex items-center gap-3">
        <Monitor size={20} className="text-forge-text-secondary" />
        <h1 className="text-lg font-semibold text-forge-text-primary">Command Center</h1>
        <span className="text-sm text-forge-text-secondary">All Projects</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Ably Status */}
        <div className="flex items-center gap-2 rounded-full border border-forge-border px-3 py-1">
          <span
            className={cn(
              'h-2 w-2 rounded-full',
              ablyStatus === 'connected' ? 'bg-forge-online' : 'bg-forge-accent',
            )}
          />
          <span className="text-xs font-mono text-forge-text-secondary">
            {ablyStatus === 'connected' ? 'Ably Connected' : 'Ably Offline'}
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-md border border-forge-border bg-forge-elevated px-3 py-1.5">
          <Search size={14} className="text-forge-text-secondary" />
          <span className="text-sm text-forge-text-secondary">Search...</span>
          <kbd className="ml-4 rounded border border-forge-border bg-forge-surface px-1.5 py-0.5 text-xs font-mono text-forge-text-secondary">
            ⌘K
          </kbd>
        </div>

        {/* Notifications */}
        <button className="relative rounded-md p-2 text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary">
          <Bell size={18} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-forge-accent" />
        </button>
      </div>
    </div>
  )
}
