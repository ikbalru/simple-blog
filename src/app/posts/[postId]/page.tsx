'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import Navbar from '@/components/layout/navbar';
import SafeImage from '@/components/ui/safeImage';

import { useGetPostById } from '@/hooks/posts/useGetPostById';

import Comments from './partial/comment';

const PostbyId = () => {
  const params = useParams();
  const { post, isFetching } = useGetPostById({ id: Number(params.postId) });

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

  return (
    <>
      {/* Loading */}
      {isFetching && (
        <p className='text-md-regular mt-10 h-[100vh] text-neutral-900'>
          Please wait while data being load...
        </p>
      )}
      <Navbar />
      <main className='mx-auto mt-20 max-w-208 divide-y divide-neutral-300 px-4 md:mt-32'>
        {post && (
          <>
            {/* content post */}
            <section className='pb-3 md:pb-4'>
              {/* title */}
              <h1 className='display-sm-bold md:display-lg-bold text-neutral-900'>
                {post.title}
              </h1>

              {/* tag */}
              <ul className='mt-3 flex h-7 flex-wrap gap-x-2 overflow-hidden md:mt-4'>
                {post.tags.map((tag, index) => (
                  <li
                    key={index}
                    className='h-full rounded-md border border-neutral-300 px-2 py-0.5'
                  >
                    <p className='text-xs-regular text-neutral-900'>{tag}</p>
                  </li>
                ))}
              </ul>

              {/* post account */}
              <div className='mt-3 flex items-center gap-3 md:mt-4'>
                {/* profile */}
                <div className='flex items-center gap-2'>
                  {/* image profile */}
                  <div className='h-7.5 w-7.5 shrink-0 overflow-hidden rounded-full bg-neutral-400 md:h-10 md:w-10'></div>

                  {/* name profile */}
                  <p className='text-xs-regular md:text-sm-medium text-neutral-900'>
                    {post.author.name}
                  </p>

                  {/* divider */}
                  <div className='aspect-square w-1 rounded-full bg-neutral-400'></div>

                  {/* time of create post */}
                  <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                    {formatDate(post.createdAt)}
                  </p>
                </div>
              </div>
            </section>

            {/* engagement post */}
            <section className='flex items-center gap-3 py-3 md:gap-5 md:py-4'>
              {/* like */}
              <div className='flex items-center gap-1.5'>
                <Image
                  src='/icons/like-icon.svg'
                  alt='like'
                  width={20}
                  height={20}
                />
                <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                  {post.likes}
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
                  {post.comments}
                </p>
              </div>
            </section>

            {/* content */}
            <section className='py-3 md:py-4'>
              {/* hero Image */}
              <div className='relative mb-3 aspect-[1/1] w-full overflow-hidden rounded-sm md:mb-4 md:aspect-[16/9]'>
                <SafeImage
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  sizes='100%'
                />
              </div>
              <article className='prose prose-neutral prose-base max-w-none'>
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </article>
            </section>

            {/* comments section */}
            <Comments post={post} formatDate={formatDate} />

            {/* related posts */}
            <section className='pt-3 md:pt-4'>
              <h2 className='text-xl-bold md:display-xs-bold pb-3 md:pb-4'>
                Another Posts
              </h2>
              {/* postcard */}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default PostbyId;
