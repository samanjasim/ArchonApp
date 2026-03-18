export type AblyConnectionState = 'connected' | 'connecting' | 'disconnected' | 'not_configured'

export function getAblyStatus(): AblyConnectionState {
  return 'not_configured'
}
