'use client';

import { Menu, PenLine, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '@/store/redux/auth/auth.selector';
import { logout } from '@/store/redux/auth/auth.slice';
import { useAppDispatch } from '@/store/redux/store';

import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import SearchBar from '../ui/searchBar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

const Navbar = () => {
  const user = useSelector(selectUser);

  return (
    <header className='bg-base-white fixed top-0 z-50 h-16 w-full border-b border-neutral-300 md:h-20'>
      <div className='custom-container flex h-full items-center justify-between gap-4'>
        <Link href='/' aria-label='home'>
          <Image
            src='/images/logo.svg'
            alt='company-log'
            width={105}
            height={24}
            className='shrink-0 cursor-pointer lg:h-9 lg:w-39.5'
          />
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* action buttons */}
        <nav className='hidden items-center space-x-6 lg:flex'>
          {!user ? (
            <Button asChild variant='link' size='link'>
              <Link href='/login'>Login</Link>
            </Button>
          ) : (
            <Link
              href='#'
              className='text-primary-300 flex cursor-pointer items-center gap-2'
            >
              <PenLine className='size-6' />
              <span className='text-sm-semibold underline underline-offset-3'>
                Write Post
              </span>
            </Link>
          )}

          {/* Divider */}
          <div className='h-5.75 w-px bg-neutral-300'></div>

          {!user ? (
            <Button asChild>
              <Link href='/register'>Register</Link>
            </Button>
          ) : (
            <DropDownMenu>
              <button
                aria-label='profile'
                className='flex cursor-pointer items-center gap-3 outline-none'
              >
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt='profile'
                    width={40}
                    height={40}
                    className='cursor-pointer rounded-full'
                  />
                ) : (
                  <div className='size-10 cursor-pointer rounded-full bg-neutral-400'></div>
                )}
                <p className='text-sm-medium text-neutral-900'>{user.name}</p>
              </button>
            </DropDownMenu>
          )}
        </nav>

        {/* mobile */}
        <div className='flex items-center gap-6 text-neutral-950 lg:hidden'>
          {/* mobile menu non login */}
          {!user ? (
            <>
              <Search className='size-6 cursor-pointer' />

              <Sheet>
                <SheetTrigger asChild>
                  <button className='cursor-pointer' aria-label='menu'>
                    <Menu className='size-6 cursor-pointer' />
                  </button>
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
            // mobile menu login
            <DropDownMenu>
              <button className='cursor-pointer' aria-label='profile'>
                {user.avatarUrl ? (
                  <Image
                    src={user.avatarUrl}
                    alt='profile'
                    width={40}
                    height={40}
                    className='cursor-pointer rounded-full'
                  />
                ) : (
                  <div className='size-10 cursor-pointer rounded-full bg-neutral-400'></div>
                )}
              </button>
            </DropDownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

const DropDownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='flex cursor-pointer items-center gap-2'>
          <Image
            src='/icons/user-icon.svg'
            alt='user-icon'
            width={16}
            height={16}
            className='md:size-5'
          />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex cursor-pointer items-center gap-2'
          onClick={() => {
            handleLogout();
          }}
        >
          <Image
            src='/icons/log-out-icon.svg'
            alt='log-out-icon'
            width={16}
            height={16}
            className='md:size-5'
          />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
