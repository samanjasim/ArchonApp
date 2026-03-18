import { useEffect, useState } from 'react'
import { useIpc } from '@/shared/hooks/useElectronIpc'
import { getAblyStatus } from '@/shared/lib/ably-client'
import { cn } from '@/shared/lib/utils'

interface SystemInfo {
  version: string
  platform: string
  homePath: string
}

export function SettingsPage() {
  const ipc = useIpc()
  const [info, setInfo] = useState<SystemInfo | null>(null)
  const ablyStatus = getAblyStatus()

  useEffect(() => {
    if (!ipc) return

    Promise.all([
      ipc.app.getVersion(),
      ipc.app.getPlatform(),
      ipc.app.getHomePath(),
    ]).then(([version, platform, homePath]) => {
      setInfo({ version, platform, homePath })
    })
  }, [ipc])

  const rows = [
    { label: 'App Version', value: info?.version ?? '...' },
    { label: 'Platform', value: info?.platform ?? '...' },
    { label: 'Home Path', value: info?.homePath ?? '...' },
    { label: 'API URL', value: 'http://localhost:5000' },
    { label: 'API Status', value: 'Offline', status: 'offline' as const },
    { label: 'Ably Status', value: ablyStatus === 'not_configured' ? 'Not configured' : ablyStatus },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-forge-text-primary">Settings</h1>
      <p className="mt-2 text-sm text-forge-text-secondary">
        System information and configuration.
      </p>

      <div className="mt-6 rounded-lg border border-forge-border bg-forge-surface">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              'flex items-center justify-between px-4 py-3',
              i < rows.length - 1 && 'border-b border-forge-border',
            )}
          >
            <span className="text-sm text-forge-text-secondary">{row.label}</span>
            <span className="font-mono text-sm text-forge-text-primary">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
