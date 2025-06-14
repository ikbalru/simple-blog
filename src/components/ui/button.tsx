import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex flex-center cursor-pointer outline-none shrink-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 !text-neutral-25 rounded-full text-sm-semibold',
        destructive:
          'bg-[#EE1D52] !text-neutral-25 rounded-full text-sm-semibold',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        outline:
          'bg-primary-300 !text-neutral-25 rounded-full text-xs-regular md:text-sm-regular',
        noOutline:
          'bg-base-white hover:bg-primary-100 !text-neutral-900 rounded-full text-xs-regular md:text-sm-regular',
        link: '!text-primary-300 underline-offset-4 underline hover:!text-primary-200 text-xs-regular md:text-sm-regular',
        menu: 'inline-flex items-center justify-center gap-2 rounded-md text-sm hover:bg-muted hover:text-muted-foreground bg-transparent cursor-pointer !text-neutral-950',
      },
      size: {
        default: 'h-11 w-45.5',
        sm: 'h-12 w-51',
        lg: 'h-12 w-88',
        link: 'w-fit',
        icon: 'h-6 w-6',
        page: 'h-12 min-w-12',
        menu: 'h-9 px-2 min-w-9',
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
