import { Sidebar } from './Sidebar'
import { StatusBar } from './StatusBar'
import { useAppStore } from '@/stores/app.store'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const collapsed = useAppStore((s) => s.sidebarCollapsed)

  return (
    <div className="flex h-screen flex-col bg-forge-primary">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
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
    </div>
  )
}
