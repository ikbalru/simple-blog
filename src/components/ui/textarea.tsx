import * as React from 'react';

import { cn } from '@/lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot='textarea'
      className={cn(
        'placeholder:text-sm-regular md:text-sm-regular text-xs-regular focus-within:border-primary-300 focus-within:ring-primary-300 h-35 w-full resize-none rounded-xl border border-neutral-300 px-4 py-2 text-neutral-900 outline-none placeholder:text-neutral-500',
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
