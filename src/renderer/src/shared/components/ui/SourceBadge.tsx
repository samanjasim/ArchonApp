import { cn } from '@/shared/lib/utils'
import type { ActivitySource } from '@/shared/lib/mock-data'

const styles: Record<ActivitySource, string> = {
  system: 'bg-forge-elevated text-forge-text-secondary',
  github: 'bg-forge-elevated text-forge-text-secondary',
  user: 'bg-forge-elevated text-forge-text-secondary',
}

interface SourceBadgeProps {
  source: ActivitySource
  className?: string
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5 text-xs font-mono',
        styles[source],
        className,
      )}
    >
      {source}
    </span>
  )
}
