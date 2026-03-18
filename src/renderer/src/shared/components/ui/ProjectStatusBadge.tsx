import { cn } from '@/shared/lib/utils'
import type { ProjectStatus } from '@/shared/lib/mock-data'

const styles: Record<ProjectStatus, string> = {
  draft: 'bg-forge-accent/20 text-forge-accent border-forge-accent/30',
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  paused: 'bg-amber-700/20 text-amber-500 border-amber-700/30',
  archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const dotColors: Record<ProjectStatus, string> = {
  draft: 'bg-forge-accent',
  active: 'bg-green-400',
  paused: 'bg-amber-500',
  archived: 'bg-gray-400',
}

const labels: Record<ProjectStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
}

interface ProjectStatusBadgeProps {
  status: ProjectStatus
  className?: string
}

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        styles[status],
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[status])} />
      {labels[status]}
    </span>
  )
}
