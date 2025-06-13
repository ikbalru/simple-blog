'use client';

import React from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import AvatarImage from '@/components/ui/avatarImage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

import ChangePassword from './partials/changePassword';
import { ModalEditProfile } from './partials/profileModal';
import YourPosts from './partials/yourPosts';

const Page = () => {
  const user = useAppSelector(selectUser);

  const [openEditProfile, setOpenEditProfile] = React.useState(false);

  const handleModalEditProfile = () => {
    setOpenEditProfile((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <main className='profile-container mt-20 md:mt-32'>
        {/* profile */}
        <section className='flex-between flex rounded-[0.8125rem] border border-neutral-300 px-4 py-3.25 md:px-6 md:py-4'>
          <div className='flex items-center gap-2 md:gap-3'>
            {/* image profile */}
            <AvatarImage
              src={user?.avatarUrl || '/images/profile-dummy.jpg'}
              alt='profile'
              width={40}
              height={40}
              className='aspect-ratio shrink-0 overflow-hidden rounded-full md:h-20 md:w-20'
            />

            <div>
              {/* name profile */}
              <h1 className='text-sm-bold md:text-lg-bold text-neutral-900'>
                {user?.name || 'Guest'}
              </h1>
              {/* accupation */}
              <p className='text-xs-regular md:text-md-regular text-neutral-900'>
                {user?.headline || 'No headline'}
              </p>
            </div>
          </div>
          <button
            className='text-primary-300 text-sm-semibold hover:text-primary-200 cursor-pointer underline underline-offset-2'
            onClick={handleModalEditProfile}
          >
            Edit Profile
          </button>
        </section>

        {/* section tabs */}
        <section className='pt-4 md:pt-5'>
          <Tabs defaultValue='post' orientation='horizontal'>
            <TabsList className='h-10 w-full md:h-12 md:w-88.5'>
              <TabsTrigger value='post'>Your Post</TabsTrigger>
              <TabsTrigger value='password'>Change Password</TabsTrigger>
            </TabsList>
            <TabsContent value='post'>
              <YourPosts />
            </TabsContent>
            <TabsContent value='password'>
              <ChangePassword />
            </TabsContent>
          </Tabs>
        </section>

        {openEditProfile && (
          <ModalEditProfile
            isOpen={openEditProfile}
            onClose={handleModalEditProfile}
          />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Page;
