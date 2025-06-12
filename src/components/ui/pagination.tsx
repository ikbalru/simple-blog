'use client';

import { ChevronLeft, ChevronRight, MoreHorizontalIcon } from 'lucide-react';
import * as React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';

import { cn } from '@/lib/utils';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn(
        'mt-4 mb-4.5 flex flex-row items-center lg:mt-6',
        className
      )}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot='pagination-item' {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({
  className,
  isActive,
  disabled,
  size = 'page',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      aria-disabled={disabled}
      data-disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'noOutline',
          size,
        }),
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
      {...props}
      // Prevent navigation if disabled
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        props.onClick?.(e);
      }}
    />
  );
}

function PaginationPrevious({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      size='page'
      disabled={disabled}
      className={cn('!rounded-none pr-4', className)}
      {...props}
    >
      <div className='text-xs-regular md:text-sm-regular flex items-center gap-0.5 text-neutral-900'>
        <ChevronLeft className='min-w-6 text-neutral-900' />
        <p>Previous</p>
      </div>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      size='page'
      disabled={disabled}
      className={cn('!rounded-none pl-4', className)}
      {...props}
    >
      <div className='text-xs-regular md:text-sm-regular flex items-center gap-0.5 text-neutral-900'>
        <p>Next</p>
        <ChevronRight className='min-w-6 text-neutral-900' />
      </div>
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('flex size-12 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className='size-4' />
      {/* <span className='sr-only'>More pages</span> */}
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
