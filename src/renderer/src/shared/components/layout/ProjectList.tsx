import { Plus } from 'lucide-react'
import { ProjectItem } from './ProjectItem'
import { mockProjects } from '@/shared/lib/mock-data'

interface ProjectListProps {
  onCreateProject: () => void
}

export function ProjectList({ onCreateProject }: ProjectListProps) {
  return (
    <div className="mt-4 flex-1 overflow-y-auto px-2">
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-forge-text-secondary">
          Projects
        </span>
        <button
          onClick={onCreateProject}
          className="rounded p-0.5 text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary"
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="space-y-0.5">
        {mockProjects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
