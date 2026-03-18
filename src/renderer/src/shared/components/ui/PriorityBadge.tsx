import { cn } from '@/shared/lib/utils'
import type { Priority } from '@/shared/lib/mock-data'

const styles: Record<Priority, string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  low: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const labels: Record<Priority, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

interface PriorityBadgeProps {
  priority: Priority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        styles[priority],
        className,
      )}
    >
      {labels[priority]}
    </span>
  )
}
