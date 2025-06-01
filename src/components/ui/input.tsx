import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'w-full outline-none placeholder:text-neutral-500',
        className
      )}
      {...props}
    />
  );
}

export { Input };
