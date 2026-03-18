import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full resize-none rounded-md border bg-forge-surface px-3 py-2.5 text-sm text-forge-text-primary',
          'placeholder:text-forge-text-secondary/50 outline-none transition-colors',
          error ? 'border-red-500 focus:border-red-500' : 'border-forge-border focus:border-forge-accent',
          className,
        )}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'
