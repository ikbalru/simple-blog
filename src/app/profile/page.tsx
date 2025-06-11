import Image from 'next/image';
import React from 'react';

import Navbar from '@/components/layout/navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

import YourPost from './partials/youPosts';

const Page = () => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <Navbar />
      <main className='profile-container mt-20 md:mt-32'>
        {/* profile */}
        <section className='flex-between flex rounded-[0.8125rem] border border-neutral-300 px-4 py-3.25 md:px-6 md:py-4'>
          <div className='flex items-center gap-2 md:gap-3'>
            {/* image profile */}
            <Image
              src={user?.avatarUrl || '/images/profile-dummy.jpg'}
              alt='profile'
              width={40}
              height={40}
              className='shrink-0 cursor-pointer rounded-full md:h-20 md:w-20'
            />

            <div>
              {/* name profile */}
              <p className='text-sm-bold md:text-lg-bold text-neutral-900'>
                {user?.name || 'Guest'}
              </p>
              {/* accupation */}
              <p className='text-xs-regular md:text-md-regular text-neutral-900'>
                {user?.headline || 'No headline'}
              </p>
            </div>
          </div>
          <Button variant='link' size='link'>
            Edit Profile
          </Button>
        </section>

        {/* section tabs */}
        <section className='pt-4 md:pt-5'>
          <Tabs defaultValue='post' orientation='horizontal'>
            <TabsList>
              <TabsTrigger value='post'>Your Post</TabsTrigger>
              <TabsTrigger value='password'>Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value='post'>
              <YourPost />
            </TabsContent>
            <TabsContent value='password'>
              Change your password here.
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </>
  );
};

export default Page;
