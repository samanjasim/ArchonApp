import { cn } from '@/shared/lib/utils'
import type { WorkItemStatus } from '@/shared/lib/mock-data'

const colors: Record<WorkItemStatus, string> = {
  completed: 'bg-status-completed',
  in_progress: 'bg-status-in-progress',
  ready: 'bg-status-ready',
  pending: 'bg-status-pending',
  blocked: 'bg-status-blocked',
  waiting_approval: 'bg-status-waiting',
}

interface StatusDotProps {
  status: WorkItemStatus
  size?: 'sm' | 'md'
  className?: string
}

export function StatusDot({ status, size = 'sm', className }: StatusDotProps) {
  return (
    <span
      className={cn(
        'inline-block shrink-0 rounded-full',
        size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5',
        colors[status],
        className,
      )}
    />
  )
}
