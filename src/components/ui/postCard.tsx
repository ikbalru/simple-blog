'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Post } from '@/models/post';

import SafeImage from './safeImage';

const BlogPostCard = ({
  author,
  createdAt,
  imageUrl,
  title,
  tags,
  content,
  likes,
  comments,
  id,
}: Post) => {
  const router = useRouter();

  const formatDate = (createdAt: string | Date | undefined) => {
    if (!createdAt) return '';
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  const handleDetailedPost = () => {
    router.push(`/posts/${id}`);
  };

  return (
    <article className='flex h-fit w-full items-center gap-6 lg:h-69'>
      {/* image post */}
      <div className='relative hidden h-64.5 w-85 overflow-hidden rounded-sm lg:block'>
        <SafeImage
          src={imageUrl}
          alt={title}
          fill
          sizes='100%'
          className='pointer-events-none object-cover'
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
          {/* profile */}
          <div className='flex items-center gap-2'>
            {/* image profile */}
            <div className='h-7.5 w-7.5 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-10 md:w-10'></div>

            {/* name profile */}
            <p className='text-xs-regular md:text-sm-medium text-neutral-900'>
              {author.name}
            </p>
          </div>

          {/* divider */}
          <div className='aspect-square w-1 rounded-full bg-neutral-400'></div>

          {/* time of create post */}
          <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
            {formatDate(createdAt)}
          </p>
        </div>

        {/* engagement post */}
        <div className='mt-3 flex items-center gap-3 md:mt-4 md:gap-5'>
          {/* like */}
          <div className='flex items-center gap-1.5'>
            <Image
              src='/icons/like-icon.svg'
              alt='like'
              width={20}
              height={20}
            />
            <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
              {likes}
            </p>
          </div>

          {/* comment */}
          <div className='flex items-center gap-1.5'>
            <Image
              src='/icons/comment-icon.svg'
              alt='comment'
              width={20}
              height={20}
            />
            <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
              {comments}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
