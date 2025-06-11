'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import Navbar from '@/components/layout/navbar';
import SafeImage from '@/components/ui/safeImage';

import { useGetPostById } from '@/hooks/posts/useGetPostById';
import { useGetPostComment } from '@/hooks/posts/useGetPostComment';
import { useGetPostLike } from '@/hooks/posts/useGetPostLikes';
import { useUpdatePostLike } from '@/hooks/posts/usePostLikePostById';
import { useGetUserProfile } from '@/hooks/users/useGetUserProfile';
import { selectToken, selectUser } from '@/store/redux/auth/auth.selector';
import { useAppSelector } from '@/store/redux/store';

import Comments from './partial/comment';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const PostbyId = () => {
  const params = useParams();

  const { post, isFetching } = useGetPostById({
    id: Number(params.postId),
  });
  const { user } = useGetUserProfile({
    email: post?.author.email || '',
  });
  const { comments, queryKeyComments } = useGetPostComment({
    postId: Number(params.postId),
  });
  const { likes, queryKeyPostLikes } = useGetPostLike({
    postId: Number(params.postId),
  });
  const { updatePostLike } = useUpdatePostLike();
  const currentUser = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  // filter like Post for current user
  const LikedPost = likes.find((like) => like.id === currentUser?.id) || null;

  // format date function
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

  const handleLikePost = () => {
    if (!token) {
      alert('You must login first');
      return;
    }
    updatePostLike({
      postId: Number(params.postId),
      queryKey: queryKeyPostLikes,
      currentUser: currentUser!,
    });
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
                  <Image
                    src={
                      user?.avatarUrl
                        ? BASE_URL + user.avatarUrl
                        : '/images/profile-dummy.jpg'
                    }
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className='cursor-pointer rounded-full'
                  />

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
                <button onClick={handleLikePost}>
                  <Image
                    src={
                      LikedPost
                        ? '/icons/like-active-icon.svg'
                        : '/icons/like-icon.svg'
                    }
                    alt='like'
                    width={20}
                    height={20}
                    className='shrink-0 cursor-pointer'
                  />
                </button>
                <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                  {likes.length}
                </p>
              </div>

              {/* comment */}
              <div className='flex items-center gap-1.5'>
                <Link href='#comments'>
                  <Image
                    src='/icons/comment-icon.svg'
                    alt='comment'
                    width={20}
                    height={20}
                    className='shrink-0 cursor-pointer'
                  />
                </Link>
                <p className='text-xs-regular md:text-sm-regular text-neutral-600'>
                  {comments.length}
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
            <section id='comments'>
              <Comments
                post={post}
                comments={comments}
                user={user}
                formatDate={formatDate}
                queryKeyComment={queryKeyComments}
              />
            </section>
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
