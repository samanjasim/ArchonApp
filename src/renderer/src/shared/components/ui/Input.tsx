import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-md border bg-forge-surface px-3 py-2.5 text-sm text-forge-text-primary',
          'placeholder:text-forge-text-secondary/50 outline-none transition-colors',
          error ? 'border-red-500 focus:border-red-500' : 'border-forge-border focus:border-forge-accent',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'
