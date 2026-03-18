import type { IpcApi } from '@/shared/types/ipc'

export function useIpc(): IpcApi | null {
  return window.archon ?? null
}
