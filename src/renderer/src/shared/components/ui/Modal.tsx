import { useEffect, useCallback, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Panel */}
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-lg border border-forge-border bg-forge-elevated shadow-2xl',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

interface ModalHeaderProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  onClose: () => void
}

export function ModalHeader({ icon, title, subtitle, onClose }: ModalHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold text-forge-text-primary">{title}</h2>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-forge-text-secondary transition-colors hover:bg-forge-surface hover:text-forge-text-primary"
        >
          <X size={18} />
        </button>
      </div>
      {subtitle && (
        <p className="mt-1 text-sm text-forge-text-secondary">{subtitle}</p>
      )}
    </div>
  )
}

interface ModalFooterProps {
  children: ReactNode
}

export function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-forge-border px-6 py-4">
      {children}
    </div>
  )
}
