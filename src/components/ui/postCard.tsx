'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useGetUserProfile } from '@/hooks/users/useGetUserProfile';
import { formatDate, urlTitle } from '@/lib/utility';
import { Post } from '@/models/post';

import AvatarImage from './avatarImage';
import SafeImage from './safeImage';

const PostCard = ({
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

  const { user } = useGetUserProfile({
    email: author.email,
  });

  const handleDetailedPost = () => {
    const newTitle = urlTitle(title);
    router.push(`/posts/${id}/${encodeURIComponent(newTitle)}`);
  };

  const handleVisitProfile = () => {
    router.push(`/visit-profile?email=${encodeURIComponent(author.email)}`);
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
          {/* profile */}
          <div
            className='group/profile flex cursor-pointer items-center gap-2'
            onClick={handleVisitProfile}
          >
            {/* image profile */}
            <AvatarImage
              src={user?.avatarUrl || '/images/profile-dummy.jpg'}
              alt={author.name}
              width={40}
              height={40}
              className='cursor-pointer rounded-full'
            />

            {/* name profile */}
            <p className='text-xs-regular md:text-sm-medium text-neutral-900 group-hover/profile:underline group-hover/profile:underline-offset-3'>
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

export default PostCard;
