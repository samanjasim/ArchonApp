import { List, GitBranch, BookOpen, FileCode, Settings } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { MockProject } from '@/shared/lib/mock-data'

export type ProjectTab = 'work-items' | 'repos' | 'skills' | 'claude-md' | 'settings'

interface ProjectTabsProps {
  project: MockProject
  activeTab: ProjectTab
  onTabChange: (tab: ProjectTab) => void
}

export function ProjectTabs({ project, activeTab, onTabChange }: ProjectTabsProps) {
  const tabs: Array<{ id: ProjectTab; label: string; icon: typeof List; count?: number; indicator?: string }> = [
    { id: 'work-items', label: 'Work Items', icon: List, count: project.workItems.length },
    { id: 'repos', label: 'Repos', icon: GitBranch, count: 0 },
    { id: 'skills', label: 'Skills', icon: BookOpen, count: 0 },
    { id: 'claude-md', label: 'CLAUDE.md', icon: FileCode, indicator: '\u2013' },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex items-center gap-1 border-b border-forge-border px-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'border-forge-accent text-forge-text-primary'
              : 'border-transparent text-forge-text-secondary hover:text-forge-text-primary',
          )}
        >
          <tab.icon size={14} />
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span
              className={cn(
                'flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs',
                activeTab === tab.id
                  ? 'bg-forge-accent/20 text-forge-accent'
                  : 'bg-forge-elevated text-forge-text-secondary',
              )}
            >
              {tab.count}
            </span>
          )}
          {tab.indicator && (
            <span className="text-xs text-forge-text-secondary">{tab.indicator}</span>
          )}
        </button>
      ))}
    </div>
  )
}
