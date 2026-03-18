import { useLocation, useNavigate } from 'react-router-dom'
import {
  Monitor,
  Activity,
  BookOpen,
  Settings,
  Plus,
  Flame,
  User,
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { ProjectList } from './ProjectList'

const topNavItems = [
  { path: '/', label: 'Command Center', icon: Monitor },
  { path: '/activity', label: 'Activity', icon: Activity },
  { path: '/skills', label: 'Skills', icon: BookOpen },
]

interface SidebarProps {
  onCreateProject: () => void
}

export function Sidebar({ onCreateProject }: SidebarProps) {
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
      <ProjectList onCreateProject={onCreateProject} />

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
            <div className="text-xs text-forge-online">Online</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
