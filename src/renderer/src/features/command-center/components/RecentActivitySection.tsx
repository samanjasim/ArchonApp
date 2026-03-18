import { useState } from 'react'
import { Clock, Play, GitCommit, CheckCircle, GitMerge, Square } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { SourceBadge } from '@/shared/components/ui/SourceBadge'
import { mockActivities } from '@/shared/lib/mock-data'
import type { ActivitySource, ActivityEventType } from '@/shared/lib/mock-data'

const filterTabs: Array<{ label: string; value: ActivitySource | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'System', value: 'system' },
  { label: 'GitHub', value: 'github' },
  { label: 'User', value: 'user' },
]

const eventIcons: Record<ActivityEventType, typeof Play> = {
  stage_started: Play,
  stage_completed: Square,
  push_detected: GitCommit,
  pr_merged: GitMerge,
  approval_given: CheckCircle,
  checks_passed: CheckCircle,
}

const eventIconColors: Record<ActivityEventType, string> = {
  stage_started: 'text-forge-accent bg-forge-accent/15',
  stage_completed: 'text-status-completed bg-status-completed/15',
  push_detected: 'text-forge-text-secondary bg-forge-elevated',
  pr_merged: 'text-status-merged bg-status-merged/15',
  approval_given: 'text-status-completed bg-status-completed/15',
  checks_passed: 'text-status-completed bg-status-completed/15',
}

export function RecentActivitySection() {
  const [filter, setFilter] = useState<ActivitySource | 'all'>('all')

  const filtered =
    filter === 'all' ? mockActivities : mockActivities.filter((a) => a.source === filter)

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-forge-text-secondary" />
          <h2 className="text-sm font-semibold text-forge-text-primary">Recent Activity</h2>
        </div>

        <div className="flex items-center gap-1 rounded-md border border-forge-border bg-forge-surface p-0.5">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                'rounded px-2.5 py-1 text-xs font-medium transition-colors',
                filter === tab.value
                  ? 'bg-forge-elevated text-forge-text-primary'
                  : 'text-forge-text-secondary hover:text-forge-text-primary',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-forge-border bg-forge-surface">
        {filtered.map((activity, i) => {
          const Icon = eventIcons[activity.eventType]
          const iconColor = eventIconColors[activity.eventType]

          return (
            <div
              key={activity.id}
              className={cn(
                'flex items-center gap-4 px-4 py-3',
                i < filtered.length - 1 && 'border-b border-forge-border',
              )}
            >
              <span className="w-16 shrink-0 text-right text-xs font-mono text-forge-text-secondary">
                {activity.relativeTime}
              </span>

              <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded', iconColor)}>
                <Icon size={14} />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-sm text-forge-text-primary">{activity.message}</span>
              </div>

              <div className="flex items-center gap-2">
                <SourceBadge source={activity.source} />
                <span className="text-xs text-forge-text-secondary">{activity.projectName}</span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
