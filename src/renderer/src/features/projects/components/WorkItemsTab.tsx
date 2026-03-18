import { StatusDot } from '@/shared/components/ui/StatusDot'
import { PriorityBadge } from '@/shared/components/ui/PriorityBadge'
import { cn } from '@/shared/lib/utils'
import type { MockWorkItem } from '@/shared/lib/mock-data'

interface WorkItemsTabProps {
  workItems: MockWorkItem[]
}

export function WorkItemsTab({ workItems }: WorkItemsTabProps) {
  return (
    <div>
      {/* Table header */}
      <div className="grid grid-cols-[40px_1fr_160px_100px_80px] items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-forge-text-secondary">
        <span>Status</span>
        <span>Work Item</span>
        <span>Stage</span>
        <span>Priority</span>
        <span>Updated</span>
      </div>

      {/* Rows */}
      <div>
        {workItems.map((wi) => {
          const isCompleted = wi.status === 'completed'
          const isPaused = wi.stageName === 'Paused'

          return (
            <div
              key={wi.id}
              className="grid grid-cols-[40px_1fr_160px_100px_80px] items-center gap-2 border-t border-forge-border px-4 py-3 transition-colors hover:bg-forge-surface/50"
            >
              <div className="flex justify-center">
                <StatusDot status={wi.status} size="md" />
              </div>

              <span
                className={cn(
                  'text-sm',
                  isCompleted ? 'text-forge-text-secondary/50' : 'font-medium text-forge-text-primary',
                )}
              >
                {wi.title}
              </span>

              <span
                className={cn(
                  'font-mono text-sm',
                  isCompleted
                    ? 'text-forge-text-secondary/50'
                    : isPaused
                      ? 'text-forge-text-secondary'
                      : 'text-forge-accent',
                )}
              >
                {wi.stageName}
              </span>

              <PriorityBadge priority={wi.priority} />

              <span className="font-mono text-xs text-forge-text-secondary">
                {wi.updatedAgo ?? '--'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
