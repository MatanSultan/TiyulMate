import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-[1.15rem] border bg-white/74 px-3 py-2 text-base shadow-[inset_0_1px_0_rgba(255,255,255,0.56),0_16px_38px_-30px_rgba(91,65,43,0.34)] backdrop-blur-sm transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
