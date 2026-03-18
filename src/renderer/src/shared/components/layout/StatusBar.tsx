import { useEffect, useState } from 'react'
import { getAblyStatus } from '@/shared/lib/ably-client'

export function StatusBar() {
  const [version, setVersion] = useState('')
  const ablyStatus = getAblyStatus()

  useEffect(() => {
    window.archon?.app.getVersion().then(setVersion).catch(() => setVersion('--'))
  }, [])

  return (
    <div className="flex items-center justify-between border-t border-forge-border bg-forge-surface px-4 text-xs text-forge-text-secondary"
      style={{ height: 'var(--statusbar-height)' }}
    >
      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-yellow-600" />
        <span>Ably: {ablyStatus === 'not_configured' ? 'Not configured' : ablyStatus}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
        <span>API: Offline</span>
      </div>

      <span>v{version || '...'}</span>
    </div>
  )
}
