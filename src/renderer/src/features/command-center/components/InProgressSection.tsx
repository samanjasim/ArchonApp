import { Loader2 } from 'lucide-react'
import { StatusDot } from '@/shared/components/ui/StatusDot'
import { getInProgressItems, formatElapsed } from '@/shared/lib/mock-data'

export function InProgressSection() {
  const items = getInProgressItems()

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Loader2 size={16} className="text-forge-text-secondary" />
          <h2 className="text-sm font-semibold text-forge-text-primary">In Progress</h2>
          <span className="h-1.5 w-1.5 rounded-full bg-forge-accent" />
        </div>
        <span className="text-xs text-forge-text-secondary">{items.length} running</span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-forge-border bg-forge-surface p-4 transition-colors hover:border-forge-accent/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <StatusDot status={item.status} size="md" />
                <span className="text-sm font-medium text-forge-text-primary">{item.title}</span>
              </div>
              {item.elapsedMinutes && (
                <span className="rounded bg-forge-elevated px-2 py-0.5 text-xs font-mono text-forge-accent">
                  {formatElapsed(item.elapsedMinutes)}
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-forge-text-secondary">
              <span>&lt;&gt;</span>
              <span>{item.stageName}</span>
              <span className="text-forge-border">*</span>
              <span>{item.projectName}</span>
            </div>

            {item.lastEvent && (
              <div className="mt-2 text-xs text-forge-text-secondary">
                <span className="mr-1">&larr;</span>
                {item.lastEvent}
              </div>
            )}

            {/* Progress bar */}
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-forge-elevated">
              <div
                className="h-full rounded-full bg-forge-accent transition-all"
                style={{ width: item.elapsedMinutes ? `${Math.min((item.elapsedMinutes / 120) * 100, 85)}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
