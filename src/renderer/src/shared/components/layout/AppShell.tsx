import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { StatusBar } from './StatusBar'
import { useAppStore } from '@/stores/app.store'
import { NewProjectModal } from '@/features/projects/components/NewProjectModal'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed)
  const [newProjectOpen, setNewProjectOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col bg-forge-primary">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onCreateProject={() => setNewProjectOpen(true)} />
        <main
          className="flex-1 overflow-auto transition-all duration-200"
          style={{
            marginLeft: collapsed ? 'var(--sidebar-width-collapsed)' : 'var(--sidebar-width)',
          }}
        >
          {children}
        </main>
      </div>
      <StatusBar />
      <NewProjectModal open={newProjectOpen} onClose={() => setNewProjectOpen(false)} />
    </div>
  )
}
