import { Sparkles, ArrowRight, Play } from 'lucide-react'
import { PriorityBadge } from '@/shared/components/ui/PriorityBadge'
import { getActionItems } from '@/shared/lib/mock-data'
import type { MockWorkItem } from '@/shared/lib/mock-data'

export function NeedsActionSection() {
  const items = getActionItems()

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-forge-accent" />
          <h2 className="text-sm font-semibold text-forge-text-primary">Needs Your Action</h2>
        </div>
        <span className="rounded-full bg-forge-accent/20 px-2.5 py-0.5 text-xs font-medium text-forge-accent">
          {items.length} items
        </span>
      </div>

      <div className="mt-3 space-y-1">
        {items.map((item) => (
          <ActionCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function ActionCard({ item }: { item: MockWorkItem }) {
  const isReady = item.status === 'ready'
  const actionLabel = isReady ? 'Start' : 'Review'
  const ActionIcon = isReady ? Play : ArrowRight

  return (
    <div className="flex items-center justify-between rounded-lg border border-forge-border bg-forge-surface px-4 py-3 transition-colors hover:border-forge-accent/30">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-forge-text-primary">{item.title}</div>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-forge-text-secondary">
          <span>{item.stageName}</span>
          <span className="text-forge-border">*</span>
          <span>{item.stageDescription}</span>
          <span className="text-forge-border">*</span>
          <span>{item.projectName}</span>
          {item.status === 'waiting_approval' && (
            <>
              <span className="text-forge-border">*</span>
              <span>2h waiting</span>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <PriorityBadge priority={item.priority} />
        <button className="flex items-center gap-1.5 rounded-md border border-forge-border bg-forge-elevated px-3 py-1.5 text-sm text-forge-text-primary transition-colors hover:border-forge-accent hover:text-forge-accent">
          {isReady && <ActionIcon size={14} />}
          <span>{actionLabel}</span>
          {!isReady && <ActionIcon size={14} />}
        </button>
      </div>
    </div>
  )
}
