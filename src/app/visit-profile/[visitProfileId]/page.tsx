'use client';

import { useParams } from 'next/navigation';
import { Suspense } from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import AvatarImage from '@/components/ui/avatarImage';
import NotFound from '@/components/ui/notFound';
import PostCard from '@/components/ui/postCard';

import { useIntersectionObserver } from '@/hooks/general/useIntersectionObserver';
import { useGetPostVisitProfile } from '@/hooks/posts/useGetPostVisitProfile';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <ProfileContent />
    </Suspense>
  );
};

export default Page;

const ProfileContent = () => {
  const params = useParams();
  const userId = params.visitProfileId;

  const {
    postsVisitProfile,
    userVisitProfile,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    total,
  } = useGetPostVisitProfile({
    userId: Number(userId),
    limit: 5,
  });

  const { containerRef, lastElementRef } = useIntersectionObserver<
    HTMLLIElement,
    HTMLUListElement
  >({
    callback: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <>
      <Navbar />

      <main className='profile-container mt-22 divide-y divide-neutral-300 md:mt-32'>
        {/* profile */}
        <section className='flex items-center gap-2 pb-4 md:gap-3 md:pb-6'>
          {/* image profile */}
          <AvatarImage
            src={userVisitProfile?.avatarUrl || '/images/profile-dummy.jpg'}
            alt={userVisitProfile?.name || 'profile'}
            width={40}
            height={40}
            className='aspect-ratio cursor-pointer overflow-hidden rounded-full md:h-20 md:w-20'
          />

          <div>
            {/* name profile */}
            <p className='text-sm-bold md:text-lg-bold text-neutral-900'>
              {userVisitProfile?.name}
            </p>
            {/* accupation */}
            <p className='text-xs-regular md:text-md-regular text-neutral-900'>
              {userVisitProfile?.headline || 'No Headline'}
            </p>
          </div>
        </section>

        {/* posts */}
        <section className='pt-4 md:pt-6'>
          <h1 className='text-lg-bold md:display-xs-bold pb-4 text-neutral-900 md:pb-6'>
            {total} Post
          </h1>
          <ul className='divide-y divide-neutral-300' ref={containerRef}>
            {postsVisitProfile.map((post, index) => (
              <li
                key={post.id}
                className='py-4 first-of-type:pt-0 last-of-type:pb-0 md:py-6'
                ref={
                  index === postsVisitProfile.length - 1 ? lastElementRef : null
                }
              >
                <PostCard {...post} />
              </li>
            ))}
          </ul>
        </section>
        {/* loading fetching data */}
        {isFetchingNextPage ||
          (isLoading && (
            <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
              Please wait while data being load...
            </p>
          ))}

        {/* Error */}
        {error && (
          <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
            Error loading posts: {error.message}
          </p>
        )}

        {/* not found */}
        {total === 0 && !isLoading && !error && (
          <NotFound
            title='No posts from this user yet'
            subtitle='Stay tuned for future posts'
          />
        )}
      </main>

      <Footer />
    </>
  );
};
