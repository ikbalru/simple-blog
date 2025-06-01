import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex flex-center disabled:pointer-events-none disabled:opacity-50 cursor-pointer outline-none shrink-0 font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 text-base-white rounded-full',
        destructive:
          'bg-[#EE1D52] text-neutral-950 text-base-white rounded-full',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary-300 underline-offset-4 underline hover:text-primary-200',
      },
      size: {
        default: 'h-11 w-45.5',
        sm: 'h-12 w-51',
        lg: 'h-12 w-88',
        link: 'w-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
