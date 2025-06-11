'use client';

import React from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
// import NotFound from '@/components/ui/notFound';
import NotFound from '@/components/ui/notFound';
import PostCard from '@/components/ui/postCard';

import { useGetPostsRecommended } from '@/hooks/posts/useGetPostsRecommended';

const Page = () => {
  const { postsRecommended, isFetching, total, error } = useGetPostsRecommended(
    {
      page: 1,
      limit: 5,
    }
  );
  return (
    <>
      <Navbar />

      <main className='profile-container mt-22 divide-y divide-neutral-300 md:mt-32'>
        {/* profile */}
        <section className='flex items-center gap-2 pb-4 md:gap-3 md:pb-6'>
          {/* image profile */}
          <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-20 md:w-20'></div>

          <div>
            {/* name profile */}
            <p className='text-sm-bold md:text-lg-bold text-neutral-900'>
              John Doe
            </p>
            {/* accupation */}
            <p className='text-xs-regular md:text-md-regular text-neutral-900'>
              Frontend Developer
            </p>
          </div>
        </section>

        {/* posts */}
        <section className='pt-4 pb-6 md:pt-6 md:pb-36'>
          <h1 className='text-lg-bold md:display-xs-bold text-neutral-900'>
            {total} Post
          </h1>
          <ul className='divide-y divide-neutral-300'>
            {postsRecommended.map((post) => (
              <li key={post.id} className='py-4 last-of-type:pb-0 md:py-6'>
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* not found */}
      {postsRecommended.length === 0 && (
        <NotFound
          title='No posts from this user yet'
          subtitle='Stay tuned for future posts'
          buttonLabel='Back To Home'
        />
      )}

      {/* footer */}
      <Footer />
    </>
  );
};

export default Page;
