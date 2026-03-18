import { FolderOpen, Pencil } from 'lucide-react'
import { ProjectStatusBadge } from '@/shared/components/ui/ProjectStatusBadge'
import { getProjectStats } from '@/shared/lib/mock-data'
import type { MockProject } from '@/shared/lib/mock-data'

interface ProjectHeaderProps {
  project: MockProject
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const stats = getProjectStats(project)

  function renderSummary() {
    if (project.status === 'draft') {
      return (
        <span className="font-mono text-xs text-forge-text-secondary">
          Created {project.createdAt}
        </span>
      )
    }
    if (project.status === 'archived') {
      return (
        <span className="font-mono text-xs text-forge-text-secondary">
          {stats.completed} completed &middot; read-only
        </span>
      )
    }

    const parts: string[] = []
    if (stats.active > 0) parts.push(`${stats.active} active`)
    if (stats.completed > 0) parts.push(`${stats.completed} completed`)
    if (stats.paused > 0) parts.push(`${stats.paused} paused`)

    return (
      <span className="font-mono text-xs text-forge-text-secondary">
        {parts.length > 0 ? parts.join(' \u00b7 ') : 'No work items yet'}
      </span>
    )
  }

  return (
    <div className="border-b border-forge-border px-6 py-5">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderOpen size={22} className="text-forge-accent" />
          <h1 className="text-xl font-semibold text-forge-text-primary">{project.name}</h1>
          <button className="rounded p-1 text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary">
            <Pencil size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <ProjectStatusBadge status={project.status} />
          {renderSummary()}
        </div>
      </div>

      {/* Description */}
      <div className="mt-2">
        {project.description ? (
          <p className="text-sm text-forge-text-secondary">{project.description}</p>
        ) : (
          <button className="flex items-center gap-1.5 text-sm italic text-forge-text-secondary/50 transition-colors hover:text-forge-text-secondary">
            <Pencil size={12} />
            Add a description...
          </button>
        )}
      </div>
    </div>
  )
}
