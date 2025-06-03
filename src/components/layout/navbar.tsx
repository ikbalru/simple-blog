'use client';

import { PenLine, Search } from 'lucide-react';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '@/store/redux/auth/auth.selector';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <div className='h-20 w-full border-b border-neutral-300'>
      <div className='custom-container flex h-full items-center justify-between gap-4'>
        <Image
          src='/images/logo.svg'
          alt='company-log'
          width={105}
          height={24}
          className='shrink-0 lg:h-9 lg:w-39.5'
        />

        {/* search bar */}
        <div className='hidden h-12 w-93.25 items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 lg:flex'>
          <Search className='size-6 cursor-pointer text-neutral-500' />
          <Input placeholder='Search' className='focus:outline-none' />
        </div>

        {/* action buttons */}
        <div className='hidden items-center space-x-6 lg:flex'>
          {!user ? (
            <Button asChild variant='link' size='link'>
              <Link href='/login'>Login</Link>
            </Button>
          ) : (
            <div
              typeof='button'
              className='text-primary-300 flex cursor-pointer items-center gap-2'
            >
              <PenLine className='size-6' />
              <p className='text-sm-semibold underline underline-offset-3'>
                Write Post
              </p>
            </div>
          )}

          {/* Divider */}
          <div className='h-5.75 w-px bg-neutral-300'></div>

          {!user ? (
            <Button asChild>
              <Link href='/register'>Register</Link>
            </Button>
          ) : (
            <div className='flex items-center gap-3'>
              <div className='size-8 rounded-full bg-neutral-400'></div>
              <p className='text-sm-medium text-neutral-900'>John Doe</p>
            </div>
          )}
        </div>

        {/* mobile */}
        <div className='flex items-center gap-6 text-neutral-950 lg:hidden'>
          {/* mobile menu sheet */}
          {!user ? (
            <>
              <Search className='size-6 cursor-pointer' />

              <Sheet>
                <SheetTrigger>
                  <Menu className='size-6 cursor-pointer' />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>
                      <Image
                        src='/images/logo.svg'
                        alt='company-log'
                        width={105}
                        height={24}
                      />
                    </SheetTitle>
                  </SheetHeader>

                  {/* action buttons */}
                  <div className='flex flex-col items-center gap-y-4'>
                    <Button asChild variant='link' size='link'>
                      <Link href='/login'>Login</Link>
                    </Button>

                    <Button asChild className='w-53.5'>
                      <Link href='/register'>Register</Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <div className='size-8 rounded-full bg-neutral-400'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
