'use client';

import { PenLine } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import PostCard from '@/components/ui/postCard';

import { useGetPostsRecommended } from '@/hooks/posts/useGetPostsRecommended';

const YourPost = () => {
  const { postsRecommended, isFetching, total, error } = useGetPostsRecommended(
    {
      page: 1,
      limit: 5,
    }
  );
  return (
    <div className='pt-4 md:divide-y md:divide-neutral-300 md:pt-5'>
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
        <h1 className='text-lg-bold md:display-xs-bold mr-auto text-neutral-900'>
          {total} Post
        </h1>
      </div>

      {/* posts */}
      <ul className='divide-y divide-neutral-300 pt-4 md:pt-5'>
        {postsRecommended.map((post) => (
          <li
            key={post.id}
            className='py-4 first-of-type:pt-0 last-of-type:pb-0 md:py-6'
          >
            <PostCard {...post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourPost;
