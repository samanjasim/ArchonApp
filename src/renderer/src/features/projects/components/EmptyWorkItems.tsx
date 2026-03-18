import { FolderOpen, Plus, GitBranch, BookOpen, FileCode, ArrowRight } from 'lucide-react'

const setupCards = [
  {
    icon: GitBranch,
    title: 'Connect Repositories',
    description: 'Link GitHub repos so agents know where to commit code',
    action: 'Set up',
  },
  {
    icon: BookOpen,
    title: 'Add Skills',
    description: 'Write reusable skill files with project conventions and patterns',
    action: 'Add skill',
  },
  {
    icon: FileCode,
    title: 'Configure CLAUDE.md',
    description: 'Set up the AI context file with project-specific instructions',
    action: 'Configure',
  },
]

export function EmptyWorkItems() {
  return (
    <div className="flex flex-col items-center py-16">
      {/* Empty state icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-forge-elevated">
        <FolderOpen size={36} className="text-forge-text-secondary/50" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-forge-text-primary">No work items yet</h3>
      <p className="mt-2 max-w-md text-center text-sm text-forge-text-secondary">
        Create your first work item to start building, or set up repos and skills
        to unlock more powerful AI sessions.
      </p>

      <button className="mt-6 flex items-center gap-2 rounded-md border border-forge-accent bg-transparent px-4 py-2.5 text-sm font-medium text-forge-accent transition-colors hover:bg-forge-accent/10">
        <Plus size={16} />
        Create Work Item
      </button>

      {/* Recommended Setup */}
      <div className="mt-12 w-full max-w-4xl">
        <div className="mb-4 px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-forge-text-secondary">
            Recommended Setup
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {setupCards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-forge-border bg-forge-surface p-5 transition-colors hover:border-forge-accent/30"
            >
              <card.icon size={20} className="text-forge-accent" />
              <h4 className="mt-3 text-sm font-medium text-forge-text-primary">{card.title}</h4>
              <p className="mt-1 text-xs text-forge-text-secondary">{card.description}</p>
              <button className="mt-3 flex cursor-default items-center gap-1 text-sm text-forge-accent transition-colors hover:text-forge-accent-dim">
                {card.action}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <p className="mt-4 px-1 font-mono text-xs text-forge-text-secondary/50">
          You can do these anytime
        </p>
      </div>
    </div>
  )
}
