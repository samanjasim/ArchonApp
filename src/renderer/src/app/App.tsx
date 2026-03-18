import { HashRouter } from 'react-router-dom'
import { QueryProvider } from './providers/QueryProvider'
import { AppShell } from '@/shared/components/layout/AppShell'
import { AppRoutes } from './routes'

export function App() {
  return (
    <QueryProvider>
      <HashRouter>
        <AppShell>
          <AppRoutes />
        </AppShell>
      </HashRouter>
    </QueryProvider>
  )
}
