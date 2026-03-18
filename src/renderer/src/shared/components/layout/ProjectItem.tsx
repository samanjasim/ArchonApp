import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { StatusDot } from '@/shared/components/ui/StatusDot'
import type { MockProject } from '@/shared/lib/mock-data'

interface ProjectItemProps {
  project: MockProject
}

export function ProjectItem({ project }: ProjectItemProps) {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(project.status === 'active' && project.workItems.length > 0)
  const activeCount = project.workItems.filter(
    (wi) => wi.status !== 'completed' && wi.status !== 'pending',
  ).length

  return (
    <div>
      <div className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary">
        {project.workItems.length > 0 ? (
          <button onClick={() => setExpanded(!expanded)} className="shrink-0">
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <button
          onClick={() => navigate(`/projects/${project.id}`)}
          className="flex-1 truncate text-left hover:text-forge-accent transition-colors"
        >
          {project.name}
        </button>
        {project.status === 'paused' ? (
          <span className="text-xs text-forge-text-secondary">paused</span>
        ) : activeCount > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forge-elevated px-1.5 text-xs text-forge-text-secondary">
            {activeCount}
          </span>
        ) : null}
      </div>

      {expanded && project.workItems.length > 0 && (
        <div className="ml-5 space-y-0.5 py-0.5">
          {project.workItems.map((wi) => (
            <div
              key={wi.id}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary"
            >
              <StatusDot status={wi.status} />
              <span className="truncate">{wi.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
