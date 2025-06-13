'use client';

import { PenLine } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import NotFound from '@/components/ui/notFound';
import SafeImage from '@/components/ui/safeImage';

import { useIntersectionObserver } from '@/hooks/general/useIntersectionObserver';
import { useGetMyPostsInfinite } from '@/hooks/posts/useGetMyPost';
import { Post } from '@/models/post';

import { ModalDelete, ModalStatistics } from './postsModal';

const YourPost = () => {
  const router = useRouter();
  const {
    postsInfinite,
    total,
    isFetchingNextPage,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useGetMyPostsInfinite({
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
    <section className='pt-4 md:divide-y md:divide-neutral-300 md:pt-5'>
      {/* header */}
      <div className='flex-between flex flex-row-reverse flex-wrap md:pb-5'>
        <Button asChild className='h-11 w-full md:w-45.5'>
          <Link href='#' className='flex gap-2'>
            <PenLine className='size-5' />
            <span className='text-sm-semibold'>Write Post</span>
          </Link>
        </Button>

        {/* divider */}
        <div className='my-4 block h-px w-full bg-neutral-300 md:hidden'></div>

        {/* title */}
        <h2 className='text-lg-bold md:display-xs-bold mr-auto text-neutral-900'>
          {total} Post
        </h2>
      </div>

      {/* posts */}
      {postsInfinite.length > 0 && (
        <ul
          className='divide-y divide-neutral-300 pt-4 md:pt-5'
          ref={containerRef}
        >
          {postsInfinite.map((post, index) => (
            <li
              key={post.id}
              className='py-4 first-of-type:pt-0 last-of-type:pb-0 md:py-6'
              ref={index === postsInfinite.length - 1 ? lastElementRef : null}
            >
              <PostCardUser {...post} />
            </li>
          ))}
        </ul>
      )}

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
      {postsInfinite.length === 0 && (
        <NotFound
          title='Your writing journey starts here'
          subtitle='No posts yet, but every great writer starts with the first one.'
          imageButton={<PenLine className='size-5' />}
          buttonLabel='Write Post'
          onClick={() => router.push('/')}
        />
      )}
    </section>
  );
};

export default YourPost;

export const PostCardUser = ({
  createdAt,
  imageUrl,
  title,
  tags,
  content,
  id,
}: Post) => {
  const router = useRouter();
  const [openStatistics, setOpenStatistics] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const formatDate = (createdAt: string | Date | undefined) => {
    if (!createdAt) return '';
    const date = new Date(createdAt);

    const dateOptions = date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const timeOptions = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    return `${dateOptions}, ${timeOptions}`;
  };

  const handleModalStatistic = () => {
    setOpenStatistics((prev) => !prev);
  };

  const handleModalDelete = () => {
    setOpenDelete((prev) => !prev);
  };

  const handleDetailedPost = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <article className='flex h-fit w-full items-center gap-6 lg:h-69'>
      {/* image post */}
      <div
        className='group/post relative hidden h-64.5 w-85 cursor-pointer overflow-hidden rounded-sm lg:block'
        onClick={handleDetailedPost}
      >
        <SafeImage
          src={imageUrl}
          alt={title}
          fill
          sizes='100%'
          className='pointer-events-none object-cover transition-transform duration-400 ease-in-out group-hover/post:scale-110'
        />
      </div>

      {/* content description */}
      <div className='w-full lg:max-w-110.75'>
        <p
          className='text-md-bold md:text-xl-bold cursor-pointer hover:underline hover:underline-offset-5'
          onClick={handleDetailedPost}
        >
          {title}
        </p>

        <ul className='mt-2 flex h-7 flex-wrap gap-x-2 overflow-hidden md:mt-3'>
          {tags.map((tag, index) => (
            <li
              key={index}
              className='h-full rounded-md border border-neutral-300 px-2 py-0.5'
            >
              <p className='text-xs-regular text-neutral-900'>{tag}</p>
            </li>
          ))}
        </ul>

        <p className='text-xs-regular md:text-sm-regular mt-2 line-clamp-2 text-neutral-900 md:mt-3'>
          {content}
        </p>

        {/* post account */}
        <div className='mt-3 flex items-center gap-3 md:mt-4'>
          {/* time of update post */}
          <p className='text-xs-regular md:text-sm-regular text-neutral-700'>
            Created {formatDate(createdAt)}
          </p>

          {/* divider */}
          <div className='h-4 w-px bg-neutral-300'></div>

          {/* time of update post */}
          <p className='text-xs-regular md:text-sm-regular text-neutral-700'>
            Last Updated {formatDate(createdAt)}
          </p>
        </div>

        {/* engagement post */}
        <div className='mt-3 flex items-center gap-3 md:mt-4'>
          <button
            className='text-sm-semibold text-primary-300 hover:text-primary-200 cursor-pointer underline underline-offset-2'
            onClick={handleModalStatistic}
          >
            Statistic
          </button>
          <div className='h-5.75 w-px bg-neutral-300'></div>
          <button className='text-sm-semibold text-primary-300 hover:text-primary-200 cursor-pointer underline underline-offset-2'>
            Edit
          </button>
          <div className='h-5.75 w-px bg-neutral-300'></div>
          <button
            className='text-sm-semibold cursor-pointer text-[#EE1D52] underline underline-offset-2 hover:opacity-50'
            onClick={handleModalDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {openStatistics && (
        <ModalStatistics
          postId={id}
          isOpen={openStatistics}
          onClose={handleModalStatistic}
        />
      )}
      {openDelete && (
        <ModalDelete
          postId={id}
          isOpen={openDelete}
          onClose={handleModalDelete}
        />
      )}
    </article>
  );
};
