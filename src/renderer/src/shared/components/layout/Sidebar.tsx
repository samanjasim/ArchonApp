import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Monitor,
  Activity,
  BookOpen,
  Settings,
  Plus,
  ChevronRight,
  ChevronDown,
  Flame,
  User,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { StatusDot } from '@/shared/components/ui/StatusDot'
import { mockProjects } from '@/shared/lib/mock-data'
import type { MockProject } from '@/shared/lib/mock-data'

const topNavItems = [
  { path: '/', label: 'Command Center', icon: Monitor },
  { path: '/activity', label: 'Activity', icon: Activity },
  { path: '/skills', label: 'Skills', icon: BookOpen },
]

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <aside
      className="fixed left-0 top-0 z-10 flex h-full flex-col border-r border-forge-border bg-forge-surface"
      style={{ width: 'var(--sidebar-width)' }}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 px-4">
        <Flame size={20} className="text-forge-accent" />
        <span className="text-sm font-semibold tracking-wide text-forge-text-primary">Archon</span>
      </div>

      {/* New Work Item CTA */}
      <div className="px-3 pb-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-forge-accent px-3 py-2 text-sm font-medium text-forge-primary transition-colors hover:bg-forge-accent-dim">
          <Plus size={16} />
          <span>New Work Item</span>
        </button>
      </div>

      {/* Top Navigation */}
      <nav className="space-y-0.5 px-2">
        {topNavItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive(item.path)
                ? 'bg-forge-accent/15 text-forge-accent'
                : 'text-forge-text-secondary hover:bg-forge-elevated hover:text-forge-text-primary',
            )}
          >
            <item.icon size={16} />
            <span className="flex-1 text-left">{item.label}</span>
            {isActive(item.path) && (
              <span className="h-1.5 w-1.5 rounded-full bg-forge-accent" />
            )}
          </button>
        ))}
      </nav>

      {/* Projects Section */}
      <div className="mt-4 flex-1 overflow-y-auto px-2">
        <div className="flex items-center justify-between px-3 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-forge-text-secondary">
            Projects
          </span>
          <button className="rounded p-0.5 text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary">
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-0.5">
          {mockProjects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-forge-border">
        {/* Settings */}
        <div className="px-2 pt-2">
          <button
            onClick={() => navigate('/settings')}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
              isActive('/settings')
                ? 'bg-forge-accent/15 text-forge-accent'
                : 'text-forge-text-secondary hover:bg-forge-elevated hover:text-forge-text-primary',
            )}
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-5 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forge-elevated">
            <User size={16} className="text-forge-text-secondary" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-forge-text-primary">Commander</div>
            <div className="text-xs text-green-500">Online</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function ProjectItem({ project }: { project: MockProject }) {
  const [expanded, setExpanded] = useState(project.status === 'active' && project.workItems.length > 0)
  const activeCount = project.workItems.filter(
    (wi) => wi.status !== 'completed' && wi.status !== 'pending',
  ).length

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-forge-text-secondary transition-colors hover:bg-forge-elevated hover:text-forge-text-primary"
      >
        {project.workItems.length > 0 ? (
          expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
        ) : (
          <span className="w-3.5" />
        )}
        <span className="flex-1 truncate text-left">{project.name}</span>
        {project.status === 'paused' ? (
          <span className="text-xs text-forge-text-secondary">paused</span>
        ) : activeCount > 0 ? (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-forge-elevated px-1.5 text-xs text-forge-text-secondary">
            {activeCount}
          </span>
        ) : null}
      </button>

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
